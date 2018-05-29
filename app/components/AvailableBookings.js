import React from 'react';
import { TouchableHighlight, FlatList, Text, StyleSheet,TouchableOpacity, View, Button, Alert, ActivityIndicator} from 'react-native';
import firebase from 'react-native-firebase';
import moment from 'moment/min/moment-with-locales';
import Timeline from 'react-native-timeline-listview';
import {TABBAR_GREY,GREEN, WHITE, GREY1, BACKGROUND_GREY, RED} from '../styles';


export default class AvailableBookings extends React.Component {
    constructor({roomID}){
        super();    
      this.state = {
        date: moment().locale('sv').format('L'),
        time: moment().locale('sv').format('LT'),
        startTime: '',
        endTime: '',
        loading: true,
        listOfBookings: [],
        room: roomID,
      }
    }

    componentDidMount(){
      this.getBookings()
    }

//     geetBookings() {
//       const availableRooms = [];
//       const unavailableRooms = [];
//       const listOfAvailableBookings = [];
//       const listOfUnavailableBookings = [];
//       var currentDate = this.state.date;
//       var currentTime = this.state.time;
//       const bookingRef = firebase.firestore().collection('Bookings')
//       .where('date', '==', currentDate);
//       bookingRef.get()
//       .then((querySnapshot) => {
//           if (querySnapshot.empty){
//             alert('Det finns inga bokningar idag');
//             this.setState({
//               loading: false,
//             })
//           }
//           else{
//             querySnapshot.forEach( (doc) => {
//             const roomName = doc.get('room');
//             const roomID = doc.get('roomID')
//             const bookingTitle = doc.get('title');
//             const startTime = doc.get('startTime');
//             const endTime = doc.get('endTime');
//             const bookedBy = doc.get('ownerName');
//             const bookingDate = doc.get('date');
//             if (startTime <= currentTime && endTime >= currentTime){
//                 listOfUnavailableBookings.push({
//                     startTime: startTime,
//                     endTime: endTime,
//                     title: bookingTitle,
//                     room: roomName,
//                     date: bookingDate,
//                     description: 'Bokat av '+ bookedBy,
//                     id: doc.id,
//                     roomID: roomID,
//                     }); 
//                 unavailableRooms.push({
//                     title: roomName,
//                     description: 'Bokat av ' + bookedBy,
//                     })
//                 }
//             else{
//                 listOfAvailableBookings.push({
//                     startTime: startTime,
//                     endTime: endTime,
//                     title: bookingTitle,
//                     room: roomName,
//                     date: bookingDate,
//                     description: 'Bokat av '+ bookedBy,
//                     id: doc.id,
//                     roomID: roomID,
//                 })
//             }
//       })
//     this.setState({
//         availableRooms,
//         unavailableRooms,
//         loading: false,
//         listOfAvailableBookings, 
//     })
// }
//     })
//     .catch((error) => {
//         alert(error.toString());
//       })
//   }
    getBookings() {
        const listOfBookings = [];
        var currentDate = this.state.date;
        var currentTime = this.state.time;
        const bookingRef = firebase.firestore().collection('Bookings')
        .where('roomID', '==', this.state.room).where('date', '==', currentDate);
        bookingRef.get()
        .then((querySnapshot) => {
            if (querySnapshot.empty){
              this.setState({
                loading: false,
              })
            }
            else{
            querySnapshot.forEach( (doc) => {
            const roomName = doc.get('room');
            const bookingTitle = doc.get('title');
            const startTime = doc.get('startTime');
            const endTime = doc.get('endTime');
            const bookedBy = doc.get('ownerName');
            const bookingDate = doc.get('date');
                listOfBookings.push({
                    startTime: startTime,
                    endTime: endTime,
                    title: bookingTitle,
                    room: roomName,
                    date: bookingDate,
                    description: 'Bokat av '+ bookedBy,
                    id: doc.id,
                    available: false,
                  });
        })
        this.setState({
        listOfBookings,
        loading: false,
      })}
      })
      .catch((error) => {
          alert(error.toString());
        })
    }

    onTimeChanged(newTime) {
          this.setState({startTime:newTime})
        }

//    <View style={styles.mainContainer}>
//         <Text style= {styles.infoText}> Tiden: {this.state.date}, Lista: {this.state.listOfBookings} </Text>
//         </View>

    currentBooking(item) {
      var currentTime = this.state.time;
      if (item.startTime <= currentTime && item.endTime >= currentTime) {

        return (
          <View style = {styles.mainContainer}>
          <Text style={styles.bookedItem}>{item.title} {'\n'}
          <Text style={styles.bookedSubtitle}> {item.room} {'\n'} {item.date}   {item.startTime}-{item.endTime}</Text>
          </Text></View>
        );
      }
      else {
        return (
          <View style = {styles.mainContainer}>
          <Text style={styles.item}>{item.title} {'\n'}
          <Text style={styles.subtitle}> {item.room} {'\n'} {item.date}  {item.startTime}-{item.endTime}</Text>
          </Text></View>
        );
      }
    }

    render() {
      if (this.state.loading) {
        return (<ActivityIndicator/>); // or render a loading icon
      }

      return ( 
        <View style = {styles.mainContainer}>
        {this.state.listOfBookings.length > 0 ? 
        (
        <View>
        <Text style={styles.title}> Dagens bokningar: </Text>  
        <FlatList 
          style = {styles.flatList}
          data = {this.state.listOfBookings}
          renderItem= {({item}) => 
              <View>
                {this.currentBooking(item)}
              </View>}
        keyExtractor={(item, index) => index.toString()}
        />
        </View>)
        :
        (<View> <Text style = {styles.noBookings}> Det finns inga bokningar idag! </Text> </View>)
        }
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    mainContainer: {
      padding: 15,
      flex: 1,
    },
    flatList: {
      width: 300,
    },
    item: {
      fontSize: 18,
      color: WHITE,
    },
    subtitle: {
        fontSize: 12,
        color: WHITE,
    },
    bookedItem: {
      fontSize: 18,
      color: GREEN,
    },
    bookedSubtitle: {
        fontSize: 12,
        color: GREEN,
    },
    title: {
      fontSize: 22,
      color: WHITE,
    },
    noBookings:{ 
      fontSize: 18,
      color: WHITE,
      alignSelf: 'center',
      marginTop: 60,
    }
})