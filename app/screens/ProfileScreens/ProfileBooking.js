import React from 'react';
import firebase from 'react-native-firebase';
import { StyleSheet, Platform, Image, Text, TextInput, TouchableOpacity, View, Button, Alert } from 'react-native';
import moment from 'moment/min/moment-with-locales';
import {WHITE,TABBAR_GREY, GREY1, BACKGROUND_GREY, GREEN, RED, GREY2, theWindow} from '../../styles';

export default class ProfileBooking extends React.Component {
  constructor(props){
    super(props);
        this.unsubscribe = null;
        this.state = {
          booking: this.props.navigation.state.params.booking,
          bookingID: this.props.navigation.state.params.bookingID,
          uid: firebase.auth().currentUser.uid,
        };
  }

  removeBooking(item) {
    var roomRef = firebase.firestore().collection('Rooms').doc(item.roomID).collection('bookings').doc(item.id).delete(); //delete from Rooms
    var bookingsRef = firebase.firestore().collection('Bookings').doc(item.id).delete(); //delete from Bookings
    var remove = firebase.firestore().collection('Users').doc(this.state.uid).collection('bookings').doc(item.id).delete();//delete from Users
  
    this.props.navigation.navigate('ProfileMain'); //switch screen after removing booking
}       

  cancel() {
        Alert.alert(
            'Avboka reservation',
            'Är du säker på att du vill avboka ditt rum?',
            [
              {text: 'Avbryt', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: 'Avboka', onPress: () => {this.removeBooking(this.state.booking)}}
            ],

            { cancelable: true }) 
        }


    render() {
      return (
        <View style={ styles.mainContainer}>
        <View style= {styles.bookingInfoContainer}>
            
            
            <Text style= {styles.bookingDate}>Datum: {this.state.booking.date}</Text>
            <Text style= {styles.bookingTime}>Tid: {this.state.booking.time}</Text>
            <Text style= {styles.bookingRoom}>Rum: {this.state.booking.room}</Text>
            <Text style= {styles.bookingInfo}>{this.state.booking.info}</Text>
            

            </View> 
            <TouchableOpacity onPress={() => alert('ändra')} style={styles.editButtonContainer}>
            <Text style={styles.buttonTextStyle}>Ändra</Text>
            </TouchableOpacity> 

            <TouchableOpacity onPress={() => this.cancel()} style={styles.cancelButtonContainer}>
              <Text style={styles.buttonTextStyle}>Avboka</Text>
            </TouchableOpacity> 
        </View>  
    );
  }
    
  }

  const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: BACKGROUND_GREY,
    },
    bookingTime:{
        color: WHITE,
        fontSize: 14,
        fontWeight: 'bold',
      //  alignSelf: 'center',
        textAlign: 'left',
        paddingBottom:5,
    },
    bookingDate:{
      color: WHITE,
      fontSize: 16,
      fontWeight: 'bold',
    //  alignSelf: 'center',
      textAlign: 'left',
      paddingBottom:5,
    },
    bookingRoom:{
        color: WHITE,
        fontSize: 14,
        textAlign: 'left',
        paddingBottom:15,
    },
    bookingInfo:{
      color: WHITE,
      fontSize: 14,
      alignSelf: 'center',
      fontStyle: 'italic',
      textAlign: 'center',
      paddingBottom:5,
    },
    bookingInfoContainer:{
      backgroundColor: GREY2,
      padding: 10,
      textAlign: 'left',
      alignItems: 'flex-start',
      width: theWindow.width -120, 
    },
    editButtonContainer: {
      backgroundColor: '#f4bc56',
      marginTop: 150,
      borderRadius: 20,
      width: 250,
      padding: 1,
      alignItems: 'center',
    },
    cancelButtonContainer: {
      backgroundColor: RED,
      margin: 10,
      borderRadius: 20,
      width: 250,
      padding: 1,
      alignItems: 'center',
    },
    buttonTextStyle: {
      color: WHITE,
      paddingTop: 10,
      paddingBottom: 10,
    }, 
  });