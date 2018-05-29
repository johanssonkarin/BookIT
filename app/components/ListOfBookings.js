import React from 'react';
import firebase from 'react-native-firebase';
import { Console, FlatList, Button, View, Text, TextInput, Alert } from 'react-native';
import { List, ListItem, SearchBar } from 'react-native-elements';
import {GREEN, WHITE, BACKGROUND_GREY, GREY1 } from '../styles';
//import BookingList from './BookingList'; 

class ListOfBookings extends React.Component {
    constructor() {
        super();
        this.ref = firebase.firestore().collection('Rooms');
        this.unsubscribe = null;
        this.state = {
            text: '',
            loading: true,
            listOfRooms: [],
            matchList: [],
            currentTime: '',
            availableRooms: [],
        };
    }

    componentDidMount() {
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate) 
    }
    
    componentWillUnmount() {
        this.unsubscribe();
    }

    onCollectionUpdate = (querySnapshot) => {
    const listOfRooms = [];
    querySnapshot.forEach((doc) => {
        const { roomName, id, startTime, endTime } = doc.data();
        listOfRooms.push({
        key: doc.id,
        doc, // DocumentSnapshot
        roomName,
        id,
        startTime,
        endTime,
        });
    });
    this.setState({ 
    listOfRooms,
    matchList: listOfRooms,
    loading: false,
    });
    }
      
      renderSeparator = () => {
        return (
          <View
            style={{
              height: 1,
              width: "86%",
              backgroundColor: GREY1,
              marginLeft: "14%"
            }}
          />
        );
      };

      updateTextInput(value) {
        this.setState({ textInput: value });
    }

      renderFooter = () => {
        if (!this.state.loading) return null;
    
        return (
          <View
            style={{
              paddingVertical: 20,
              borderTopWidth: 1,
              //borderColor: WHITE,
            }}
          >
            <ActivityIndicator animating size="large" />
          </View>
        );
    }

    searchText(text){
        //this.setState({text : text})
        //let inputText = text.toLowerCase();
        const copyList = this.state.listOfRooms;
        for (var index=0 ; index < copyList.length; index++ ){
          if (copyList[index].roomName === text){
            this.setState({
              matchList : [copyList[index]]
            });
          }
        }
        if (!text){
          this.setState({matchList : copyList})}
      }

      // where('startTime', '>', '12:00')

       getTimeInformation() {
        const availableRooms = [];
        starter = '';
        var array = this.state.matchList;
        for (var i=0; i<array.length;i++){
          var bookingRef = firebase.firestore().collection('Rooms').doc(array[i].id).collection('bookings');
          bookingRef.get().then(function(querySnapshot) {
            querySnapshot.forEach((doc) => {
                if (doc.exists){
                  const startTime= doc.data().startTime;
                  if (startTime!=null){
                  starter=startTime;
                  //alert(starter);
                }}
            })
          })
        }
        return 'Hej Cool!';
      } 
     
render() {
    if (this.state.loading) {
        return null; // or render a loading icon
      }

    return (
      <List
          containerStyle = {{ borderTopWidth: 0, borderBottomWidth: 0, backgroundColor: BACKGROUND_GREY}}>
          <SearchBar placeholder="Sök rum" lightTheme round value={this.state.text} onChangeText = {(text) => {this.searchText(text) }} />
          <FlatList style = {styles.flatList}
              data={this.state.matchList}
              renderItem={({ item }) =>  <ListItem
                          title={`${item.roomName}`}
                          titleStyle = {styles.text}
                          subtitle='ledigt'
                          color={WHITE}
                          containerStyle={{ borderBottomWidth: 0}}/>
                        }
            ItemSeparatorComponent={this.renderSeparator}
            ListFooterComponent={this.renderFooter}
          />
          <View>
            <Text style = {styles.text}> {this.getTimeInformation()}</Text>
          </View>
      </List> 
    )
}
};

//ListHeaderComponent={this.renderHeader}
const styles = {
    text: {
      color: WHITE,
    },
    flatList: {
        //flex: 1,
        //width: 380,
        marginBottom: 100,
    },
}

export default ListOfBookings;