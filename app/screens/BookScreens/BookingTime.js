import React from 'react';
import { StyleSheet, Platform, Image, Text, TextInput, TouchableHighlight, View, Button, Alert, ActivityIndicator} from 'react-native';
import firebase from 'react-native-firebase';
import moment from 'moment/min/moment-with-locales';
import Timeline from 'react-native-timeline-listview';
import BookingTimeList from '../../components/BookingTimeList';
import {TABBAR_GREY,GREEN, WHITE, GREY1, BACKGROUND_GREY, RED} from '../../styles';

export default class BookingTime extends React.Component {
    constructor(props){
        super(props);
        
    
      this.state = {
        now: moment().format('L'),
        date: this.props.navigation.state.params.date,
        room: this.props.navigation.state.params.room,
        roomID: this.props.navigation.state.params.roomID,
        startTime: '',
        endTime: '',
        loading: true,
        waiting: true,
        listOfBookings: [],
        arrayOfTimes: [],
        isSelected: false, 
        errorMessage: '',
      }

      this.ref = firebase.firestore().collection('Bookings').where('roomID','==',this.state.roomID).where('date', '==', this.state.date)
    }

    componentDidMount(){
      this.getBookings()
    }

    checkAndAdd(listOfBookings) {
      const list = listOfBookings;
      const arrayOfTimes = list.concat([
        {time: '08:00', title: 'Ledigt', endTime: '08:30',},
        {time: '08:30', title: 'Ledigt', endTime: '09:00',},
        {time: '09:00', title: 'Ledigt', endTime: '09:30',},
        {time: '09:30', title: 'Ledigt', endTime: '10:00',},
        {time: '10:00', title: 'Ledigt', endTime: '10:30',},
        {time: '10:30', title: 'Ledigt', endTime: '11:00',},
        {time: '11:00', title: 'Ledigt', endTime: '11:30',},
        {time: '11:30', title: 'Ledigt', endTime: '12:00',},
        {time: '12:00', title: 'Ledigt', endTime: '12:30',},
        {time: '12:30', title: 'Ledigt', endTime: '13:00',},
        {time: '13:00', title: 'Ledigt', endTime: '13:30',},
        {time: '13:30', title: 'Ledigt', endTime: '14:00',},
        {time: '14:00', title: 'Ledigt', endTime: '14:30',},
        {time: '14:30', title: 'Ledigt', endTime: '15:00',},
        {time: '15:00', title: 'Ledigt', endTime: '15:30',},
        {time: '15:30', title: 'Ledigt', endTime: '16:00',},
        {time: '16:00', title: 'Ledigt', endTime: '16:30',},
        {time: '16:30', title: 'Ledigt', endTime: '17:00',},
        {time: '17:00', title: 'Ledigt', endTime: '17:30',},
        {time: '17:30', title: 'Ledigt', endTime: '18:00',},
        {time: '18:00', title: 'Ledigt', endTime: '18:30',},
        {time: '18:30', title: 'Ledigt', endTime: '19:00',},
        {time: '19:00', title: 'Ledigt', endTime: '19:30',},
        {time: '19:30', title: 'Ledigt', endTime: '20:00',},
        {time: '20:00', title: 'Ledigt', endTime: '20:30',},
        {time: '20:30', title: 'Ledigt', endTime: '21:00',},
      ]);

      var newList = this.fixBookingArray(arrayOfTimes); //takes away starttime duplicates

    newList.sort((a, b) => { 
        return b.time < a.time ?  1 // if b should come earlier, push a to end
            : b.time > a.time ? -1 // if b should come later, push a to begin
            : a.lineColor == RED ? -1
            : 0;                   // a and b are equal
    });

    var theListToUse = []
 
    for (i = 0; i < newList.length ; i++){ 
      var listToCompare = newList.slice(0,i)
      var found = listToCompare.find(object => {
        return newList[i].time < object.endTime
      })
        if (!found) {
          theListToUse.push(newList[i])
        } 
      }
    

      this.setState({arrayOfTimes: theListToUse,
        loading:false})
      //
     
      
    }

  fixBookingArray(array){
      var newArray = array.reduce(function(previous, current) {
        var object = previous.filter(object => object.time == current.time);
        if (object.length == 0 ) {
          previous.push(current);
        }
        return previous;
      }, []);
    return newArray;
    }

    getBookings() { 
      const listOfBookings = []
      this.ref.get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const roomName = doc.get('room');
          const information = doc.get('description');
          const bookingTitle = doc.get('title');
          const bookingTime = doc.get('startTime');
          const bookedBy = doc.get('ownerName');
          const bookingEnd = doc.get('endTime');
              listOfBookings.push({
                  time: bookingTime,
                  title: bookingTitle,
                  room: roomName,
                  description: 'Bokat av '+ bookedBy,
                  endTime: bookingEnd,
                  id: doc.id,
                  lineColor: RED,
                  circleColor: RED,
              }); 

              listOfBookings.sort((a, b) => { 
                return b.time < a.time ?  1 // if b should come earlier, push a to end
                    : b.time > a.time ? -1 // if b should come later, push a to begin
                    : a.lineColor == RED ? -1
                    : 0;                   // a and b are equal
            });
        })
        this.checkAndAdd(listOfBookings)
    })
      .catch((error) => {
          alert(error.toString());
        })

      this.setState({
        listOfBookings,
      }, )
      
    }

    findMinTime(selected){
      var min = selected.reduce(function(a, b) { return a.time <= b.time? a: b})
      return min.time
    }

    findMaxTime(selected){
      var max = selected.reduce(function(a, b) { return a.endTime <= b.endTime? b : a;})
      return max.endTime
    }

    onTimeChanged(selected) { // 'selected' is an array of selected times

          if(selected.length == 0){
            this.setState({isSelected:false,//Shows or hides button to next screen
            startTime:'',endTime:''})
          }else{
            var minStartTime = this.findMinTime(selected)
            var maxEndTime = this.findMaxTime(selected)

            this.setState({
              startTime: minStartTime,
              endTime: maxEndTime, 
              isSelected:true,
            })
            this.props.navigation.setParams({time: minStartTime+'-'+maxEndTime})
          }
    }

    onErrorChange(error){
      this.setState({errorMessage: error})
    }


    renderSpinnerOrList(){
      if (this.state.loading){
        return (<ActivityIndicator/>);
      }else{
        return(
          <BookingTimeList 
          selectedDate = {this.state.date}
          selectedRoomID = {this.state.roomID}
          listOfBookings= {this.state.arrayOfTimes}
          onError= {(error) => this.onErrorChange(error)}
          onChange = {(newTime) => this.onTimeChanged(newTime)}
          /> 
         
        )
      }
    }


    renderButton(){
      if(!this.state.isSelected){
        return <View></View>
      }
      else{
      return( 
        <TouchableHighlight style={styles.buttonContainer}
        onPress={() => this.props.navigation.navigate('BookingOverview', 
            {date: this.state.date, //params to send to next screen
            room: this.state.room , 
            roomID: this.state.roomID, 
            startTime: this.state.startTime,
            endTime:this.state.endTime,
        })}>
          <Text style = {styles.infoText}>Vidare</Text>
        </TouchableHighlight>)
          }
    }

    renderError(){
      if(this.state.errorMessage == ''){
        return null;
      }else{
        return <Text style={styles.errorMessage}>{this.state.errorMessage}</Text> ;
      }
    }

    render() {
      return (
        <View style={styles.mainContainer}>
          {this.renderSpinnerOrList()}
          {this.renderError()}
          {this.renderButton()}
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: BACKGROUND_GREY,
      alignItems: 'stretch',
      justifyContent:'center',
    },
    buttonContainer: {
      alignSelf: 'center',
      borderRadius: 20,
      width: 250,
      marginBottom: 10,
      padding: 10,
      backgroundColor: GREEN,
      alignItems: 'center',
      justifyContent: 'center',
    },
      textContainer:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      infoText:{
        color: WHITE, 
        fontSize: 18,
      },
      formContainer:{
        borderColor: WHITE,
        borderBottomWidth: 0.5,
        width: 250,
    },
    selected: {
      backgroundColor: GREEN,
    },
    notSelected: {
      backgroundColor: GREY1,
    },
    errorMessage:{
      color: RED,
      fontSize: 14,
      alignSelf: 'center',
      textAlign: 'center',
      padding: 5,
    }
  });