import React, {Component} from 'react';
import firebase from 'react-native-firebase';
import moment from 'moment/min/moment-with-locales';
import { TouchableHighlight, Button, FlatList, View, Text, TextInput, Alert } from 'react-native';
import { Icon, List, ListItem, SearchBar, Divider } from 'react-native-elements';
import Ionicons from "react-native-vector-icons/Ionicons";
import {GREEN, WHITE, BACKGROUND_GREY, GREY1, GREY2} from '../styles';

class GetMyBookings extends React.Component {
    constructor() {
        super();
        this.ref = firebase.firestore().collection('Users');
        this.unsubscribe = null;
        this.state = {
            loading: true,
            isRefreshing: false,
            uid: firebase.auth().currentUser.uid,
            title: '',
            time: '',
            roomName: '',
            location: '',
            currentBookings: [],
            bookings: [],
            today: moment().locale('sv').format('L'),
            now: moment().locale('sv').format('LT'),
        };
        this.ref = firebase.firestore().collection('Users').doc(this.state.uid).collection('bookings');
    }
    
    componentDidMount() {
        this.getInformation();
      }    
    

      getInformation() {
        const bookings = [];
        const currentBookings = [];
        this.ref.get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const roomName = doc.get('room');
            const information = doc.get('information');
            const bookingTitle = doc.get('title');
            const bookingStart = doc.get('startTime');
            const bookingEnd = doc.get('endTime');
            const bookingDate = doc.get('date');
            const bookingRoomID = doc.get('roomID');
             if(bookingDate == this.state.today && bookingStart>= this.state.now || bookingDate > this.state.today){ //If the booking haven't passed --> add
                bookings.push({
                    name: bookingTitle,
                    room: roomName,
                    info: information,
                    id: doc.id,
                    time: bookingStart + '-' + bookingEnd,
                    date: bookingDate,
                    roomID: bookingRoomID,
                });                   
                }
            if(bookingDate == this.state.today && bookingStart<=this.state.now && bookingEnd>=this.state.now){
                currentBookings.push({
                        name: bookingTitle,
                        room: roomName,
                        info: information,
                        id: doc.id,
                        time: bookingStart + '-' + bookingEnd,
                        endTime: bookingEnd,
                        date: bookingDate,
                        roomID: bookingRoomID,
                });
            }
            
          })
            bookings.sort((a, b) => { //Show earliest booking at top of the list
                return b.date < a.date ?  1 // if b should come earlier, push a to end
                : b.date > a.date ? -1 // if b should come later, push a to begin
                : b.time < a.time ?  1 // if b should come earlier, push a to end
                : b.time > a.time ? -1 // if b should come later, push a to begin
                : 0;                   // a and b are equal
            })
            this.setState({ 
              bookings,
              currentBookings,
              loading: false,
              });
        })
        .catch((error) => {
            alert(error.toSting());
        });
          
              //alert(this.state.currentBookings.length)
      }

      onRefresh(){
        this.setState({isRefreshing: true});
        this.getInformation()
        setTimeout(() => {
          //refresh to initial data
          this.setState({
            isRefreshing: false
          });
        }, 100);
      }
     
render() {
    if (this.state.loading) {
        return null; // or render a loading icon
      }

    return (
    <View style = {styles.mainContainer}>
    {this.state.currentBookings.length > 0 ?
        (<View>
         <Text style = {styles.title}> Pågående bokningar: </Text>
            <FlatList 
                style = {styles.flatList}
                data = {this.state.currentBookings}
                refreshing={this.state.isRefreshing}
                onRefresh={() => this.onRefresh()}
                renderItem = {({item}) => 
                    <ListItem
                        id = {item.id}
                        title ={`${item.name}`}
                        titleStyle = {{color: GREEN, fontSize: 18}}
                        subtitle = {'Bokning slutar kl ' + item.endTime}
                        onPress = {() => this.props.onPress(item)}>
                    </ListItem>
                }
                keyExtractor={(item, index) => index.toString()}
                />
            </View>)
                : null}
        
        
    <Text style = {styles.title}> Kommande bokningar: </Text>  
      {this.state.bookings.length > 0 ?  
      (<View>
     
            <FlatList 
                style = {styles.flatList}
                data = {this.state.bookings}
                refreshing={this.state.isRefreshing}
                onRefresh={() => this.onRefresh()}
                renderItem = {({item}) => 
                    <ListItem
                        id = {item.id}
                        title ={`${item.name}`}
                        titleStyle = {{color: WHITE, fontSize: 18}}
                        subtitle = {item.date + '. ' + item.time}
                        onPress = {() => this.props.onPress(item)}>
                    </ListItem>
                }
                keyExtractor={(item, index) => index.toString()}
                />
        </View>)
        :
        <Text style = {styles.subtitle}>Du har inga kommande bokningar</Text>
        }
        
    </View>
    )
}
}; 

const styles = {
    mainContainer: {
        //flex: 1,
        justifyContent: 'space-between',
        alignItems: 'stretch'
    },
    bookingContainer:{
        flex: 1,
        marginTop:20, 
        backgroundColor: BACKGROUND_GREY,
        borderTopWidth: 0, 
        borderBottomWidth: 0,
    },
    flatList: { 
        backgroundColor: GREY2,
        borderTopWidth:1, 
        borderTopColor: WHITE,
        maxHeight: 450,
    },
    currentBookingsFlatList:{
        backgroundColor: BACKGROUND_GREY
    },
    item: {
      flex: 1,
      padding: 10,
      fontSize: 18,
      color: WHITE,
      
    },
    title: {
        fontSize: 16,
        color: WHITE,
        paddingHorizontal: 20,
        paddingBottom: 10, 
        marginTop: 40, 
    },
    ongoingTitle: {
        fontSize: 18,
        color: GREEN,
        padding: 20,
    },
    subtitle: {
        fontSize: 12,
        color: WHITE,
        padding: 20,
    }
};

export default GetMyBookings;