import React from 'react';
import { StyleSheet, Platform, Image, Text, TextInput, TouchableOpacity, View, Button, Alert, FlatList } from 'react-native';
import { List, ListItem} from 'react-native-elements';
import {TABBAR_GREY,GREEN, WHITE, GREY1, BACKGROUND_GREY, RED, GREY2} from '../../styles';
import firebase from 'react-native-firebase';


import Spinner from '../../components/Spinner';



export default class BookingDetails extends React.Component {
    constructor(props){
        super(props);
        
        this.state = {
          date: this.props.navigation.state.params.date,
          room: '',
          roomID: '',
          loading: true,
          roomList: [],

        }

        this.ref = firebase.firestore().collection('Rooms');
    }

    componentDidMount() {
      this.getRoomList();
  }

    getRoomList() {
      const roomList = [];
      this.ref.get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const roomName = doc.get('roomName');
          const information = doc.get('information');
              roomList.push({
              name: roomName,
              info: information,
              id: doc.id,
              });
        })
      })
        .catch((error) => {
          alert(error.toSting());
        });
        this.setState({ 
            roomList,
            loading: false,
            });
    }

    renderSpinnerOrList(){
      if(this.state.loading){
        return(
          <Spinner/>
        );
      } else{
        return (<List
        containerStyle = {styles.listContainer}
        >
          <FlatList style = {styles.flatList}
            data={this.state.roomList}
            ItemSeparatorComponent = {this.FlatListItemSeparator}
            renderItem={({ item }) =>  
            <ListItem
                        onPress={()=> {this.setState({room: item.name, roomID:item.id});
                                      this.toNextScreen(item)}}
                        title={item.name}
                        containerStyle={{
                          backgroundColor: GREY2,
                          borderBottomWidth: 2,
                          borderTopWidth:2,
                          borderBottomColor: WHITE,
                          borderTopColor:WHITE,
                          marginBottom:40 }}
                        titleStyle = {{color: WHITE, fontSize:24}}
                        titleContainerStyle= {{padding:20}}
          /> }
          keyExtractor={(item, index) => index.toString()} />
      </List>);
        
      }
    }

    toNextScreen(item){
      this.props.navigation.navigate('BookingTime', {date: this.state.date, room: item.name , roomID: item.id });
    }
  

    render() {
      return (
        <View style={ styles.mainContainer}> 
        
        <View style= {styles.listContainer}>
          {this.renderSpinnerOrList()}
        </View>

        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: BACKGROUND_GREY,
      justifyContent: 'space-around',
      alignItems: 'center'
    },
    listContainer:{
      backgroundColor: BACKGROUND_GREY,
      alignItems: 'stretch',
      flexGrow: 1, 
      height: 'auto',
      width: 'auto',
      
    },
    buttonContainer: {
        alignSelf: 'center',
        backgroundColor: GREEN,
        margin: 10,
        borderRadius: 20,
        width: 250,
        padding: 1,
      },
      flatList: {
        flex: 1, 
        width: 400,
        flexGrow:1,
    },
  });

  // <View style={ styles.buttonContainer}>
  //        <Button
  //         title='Vidare'
  //         color= {WHITE}
  //         onPress={() => this.props.navigation.navigate('BookingOverview', {date: this.state.date, room: this.state.room, roomID: this.state.roomID })}
  //       />
  //       </View>