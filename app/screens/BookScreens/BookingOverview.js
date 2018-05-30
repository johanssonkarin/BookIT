import React from 'react';
import { StyleSheet, Platform, Image, Text, TextInput, TouchableOpacity, View, Button, Alert, KeyboardAvoidingView} from 'react-native';
import firebase from 'react-native-firebase';
import {TABBAR_GREY,GREEN, WHITE, GREY1, BACKGROUND_GREY, RED, GREY2, theWindow} from '../../styles';


export default class BookingOverview extends React.Component {
    constructor(props){
        super(props);
        
        this.state = {
          date: this.props.navigation.state.params.date,
          room: this.props.navigation.state.params.room,
          roomID: this.props.navigation.state.params.roomID,
          startTime: this.props.navigation.state.params.startTime,
          endTime: this.props.navigation.state.params.endTime,
          title:'',
          description: '',
          loading: true,
          isDone: false,
          firstname: '',
          lastname: '',
          uid: firebase.auth().currentUser.uid,
        }
    }

    componentDidMount(){
      this.getUserInformation()
    }

    getUserInformation() {
      firebase.firestore().collection('Users').doc(this.state.uid).get().then((res) =>  {
        // check and do something with the data here.
        if (res.empty) {
          alert('no documents found');
        } else {// do something with the data
          this.setState({
            firstname: res.get('firstname'),
            lastname: res.get('lastname'),
          });
        }
      });
    }
  
    addBooking() {
        const thisUser = this.state.uid;
        const chosenRoom = this.state.roomID;
        const thisUserName = this.state.firstname + ' ' + this.state.lastname;
        const refBookings = firebase.firestore().collection('Bookings'); //ref for root-collection Bookings
        const refUser = firebase.firestore().collection('Users').doc(thisUser).collection('bookings'); // ref for this users booking collection
        const refRoom = firebase.firestore().collection('Rooms').doc(chosenRoom).collection('bookings'); //ref for the chosen rooms booking collection
        refBookings.add({
          title: this.state.title,
          room: this.state.room,
          roomID: chosenRoom,
          owner: thisUser,
          description: this.state.description,
          date: this.state.date,
          ownerName: thisUserName,
          startTime: this.state.startTime,
          endTime: this.state.endTime,
        })
        .then((doc) => {
          refUser.doc(doc.id).set({
            title: this.state.title,
            room: this.state.room,
            roomID: chosenRoom,
            description: this.state.description,
            date: this.state.date,
            startTime: this.state.startTime,
            endTime: this.state.endTime,
          });
          refRoom.doc(doc.id).set({
            title: this.state.title,
            owner: thisUser,
            description: this.state.description,
            bookingID: doc.id,
            date: this.state.date,
            startTime: this.state.startTime,
            endTime: this.state.endTime,
          });
        }

        )
        this.setState({
          textInput: '',
          descripton:'',
          isDone:false,
        });
      
    }


    render() {
      return (
        <KeyboardAvoidingView
        style={styles.mainContainer}
        behavior="padding"
        >
         <View style= {styles.bookingInfoContainer}>
            
            
            <Text style= {styles.bookingDate}>Rum: {this.state.room}</Text>
            <Text style= {styles.bookingTime}>Datum: {this.state.date}</Text>
            <Text style= {styles.bookingRoom}>Tid: {this.state.startTime} - {this.state.endTime}</Text>
            
            

            </View>
        

        <View style={styles.formContainer}>
        <TextInput
                autoCorrect={true}
                placeholderTextColor= {TABBAR_GREY}
                placeholder= 'Bokningstitel'
                value={this.state.title}
                onChangeText={title => {this.setState({ title, loading: false, isDone: true })
                                        this.props.navigation.setParams({title})}}
                style={styles.inputStyle}
            />
          </View>
          <View style={styles.formContainer}>
          <TextInput
                autoCorrect={true}
                placeholderTextColor= {TABBAR_GREY}
                placeholder= 'Egen kommentar'
                value={this.state.description}
                onChangeText={description => {this.setState({ description })}}
                style={styles.inputStyle}
            />
        </View>
        
         <View style={[styles.buttonContainer, this.state.title=='' ? styles.notSelected: styles.selected ]}>
         <Button
          disabled = {this.state.title==''}
          title='Boka'
          color= {WHITE}
          onPress={() => {this.addBooking()
          this.props.navigation.navigate('BookingSummary')
        }}/>
        </View>
        </KeyboardAvoidingView>
      );
    }
  }

  const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      flexDirection:'column',
      backgroundColor: BACKGROUND_GREY,
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    buttonContainer: {
        backgroundColor: GREEN,
        margin: 10,
        borderRadius: 20,
        width: 250,
        padding: 1,
      },
      textContainer:{
        alignItems: 'flex-start'
      },
      infoText:{
        color: WHITE, 
        fontSize: 14,
      },
      formContainer:{
        borderColor: WHITE,
        borderBottomWidth: 0.5,
        width: 250,
    },
    inputStyle: {
      paddingRight: 5,
      paddingLeft: 5,
      paddingBottom: 2,
      color: WHITE,
      fontSize: 14,
      height: 40
    },
    selected: {
      backgroundColor: GREEN,
    },
    notSelected: {
      backgroundColor: GREY1,
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
    fontSize: 18,
    fontWeight: 'bold',
  //  alignSelf: 'center',
    textAlign: 'left',
    paddingBottom:5,
  },
  bookingRoom:{
      color: WHITE,
      fontSize: 14,
      textAlign: 'left',
  },
  bookingInfo:{
    color: WHITE,
    fontSize: 14,
    alignSelf: 'center',
    fontStyle: 'italic'
    //textAlign: 'left',
  },
  bookingInfoContainer:{
    backgroundColor: GREY2,
    padding: 10,
    textAlign: 'left',
    alignItems: 'flex-start',
    width: theWindow.width -150, 
  },
  });