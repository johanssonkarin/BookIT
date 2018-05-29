import React from 'react';
import firebase from 'react-native-firebase';
import { StyleSheet, Platform, Image, Text, TextInput, TouchableOpacity, View, Button, Alert } from 'react-native';
import moment from 'moment/min/moment-with-locales';
import {WHITE,TABBAR_GREY, GREY1, BACKGROUND_GREY, GREEN, RED} from '../../styles';

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
            <Text style= {styles.bookingInfo}>
            {this.state.booking.info}{'\n'}
            {this.state.booking.date}{'\n'}
            {this.state.booking.time}{'\n'}
            {this.state.booking.room}{'\n'}
            
            </Text>
            <View style={styles.editButtonContainer}>
              <Button 
              title={'Ändra'} 
              onPress={() => alert('ändra')}
              color = {WHITE}/>
            </View> 

            <View style={styles.cancelButtonContainer}>
              <Button 
              title={'Avboka'} 
              onPress={() => this.cancel()}
              color = {WHITE}/>
            </View> 
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
    bookingInfo:{
        color: WHITE,
        fontSize: 18,
        alignSelf: 'center',
    },
    editButtonContainer: {
      backgroundColor: 'orange',
      marginTop: 200,
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

  });