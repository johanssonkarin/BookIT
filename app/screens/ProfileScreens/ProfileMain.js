import React from 'react';
import firebase, {firestore} from 'react-native-firebase';
import { StyleSheet, Platform, Image, Text, TextInput, TouchableOpacity, View, Button, Alert } from 'react-native';
import {WHITE,TABBAR_GREY, GREY1, BACKGROUND_GREY, GREEN} from '../../styles';
import {ScreenHeader} from '../../components/ScreenHeader';
import Ionicons from "react-native-vector-icons/Ionicons";
import GetMyBookings from '../../components/GetMyBookings';
import Spinner from '../../components/Spinner';
import RoomList from '../../components/RoomList';

import AccordionProfile from '../../components/AccordionProfile';

export default class ProfileMain extends React.Component {
  constructor(){
    super();
        this.unsubscribe = null;
        this.state = {
          loading: true,
          firstname: '',
          lastname: '',
          email: '',
          uid: firebase.auth().currentUser.uid,
        };
        this.ref = firebase.firestore().collection('Users').doc(this.state.uid);
  }

  componentDidMount() {
    this.getUserInformation();

  }

  getUserInformation() {
    this.ref.get().then((res) =>  {
      // check and do something with the data here.
      if (res.empty) {
        alert('no documents found');
      } else {// do something with the data
        this.setState({loading:false});
        this.setState({
          firstname: res.get('firstname'),
          lastname: res.get('lastname'),
          email: res.get('email'),
        });
        this.props.navigation.setParams({title: res.get('firstname')+ ' '+ res.get('lastname')})
      }
    });
    
  }

  toOtherScreen(booking){
      this.props.navigation.navigate('ProfileBooking', {booking, bookingID: booking.id, name: booking.name })
  }

    render() {
      
      return (
        <View style={ styles.mainContainer}>
        <AccordionProfile onPress={(pressedBooking)=>{this.toOtherScreen(pressedBooking)}}/>
        <View style= {styles.mainContainer}>
          <GetMyBookings onPress = {(pressedBooking)=> {this.toOtherScreen(pressedBooking)}}/>
        </View>
        </View>  
    );
  }
    
  }

  //<ScreenHeader label= {this.state.firstname + ' ' +  this.state.lastname}/>

  const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      justifyContent: 'space-between',
      backgroundColor: BACKGROUND_GREY,
    },
    agendaContainer: {
      alignSelf: 'stretch',
      height: 400,
      marginBottom: 2,
    },
    userText: {
      padding: 10,
      paddingTop: 20,
      fontSize: 14,
      color: WHITE,
      textAlign: 'left',
    },
    userContainer:{
      marginTop: 80, //take away this when 'ongoingbookings' is created
      paddingLeft: 5, 
      alignItems: 'flex-start',
    },
  });