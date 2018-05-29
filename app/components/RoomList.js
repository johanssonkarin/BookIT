import React from 'react';
import firebase from 'react-native-firebase';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { List, ListItem, ButtonGroup } from 'react-native-elements';
import moment from 'moment/min/moment-with-locales';
import {GREEN, WHITE, BACKGROUND_GREY, GREY1 } from '../styles';

export default class RoomList extends React.Component {
    constructor() {
        super();
        //this.roomRef = firebase.firestore().collection('Rooms');
        this.bookingRef = firebase.firestore().collection('Bookings');
        this.unsubscribe = null;
        this.state = {
            date: moment().locale('sv').format('L'),
            time: moment().locale('sv').format('LT'),
            availableRooms: [],
            unavailableRooms: [],
            listOfAvailableBookings: [],
            listOfUnavailableBookings: [],
            selectedIndex: 0,
            showAvailableRooms: true,
            listOfRoooms: [],
            loading: true,
        };
        this.updateIndex = this.updateIndex.bind(this);
    }

    componentDidMount(){
        this.getBookings();
    }

    updateIndex(selectedIndex){
        this.setState({selectedIndex});
    }

    getBookings() {
        const availableRooms = [];
        const unavailableRooms = [];
        const listOfAvailableBookings = [];
        const listOfUnavailableBookings = [];
        const listOfRoooms = [];
        const currentDate = this.state.date;
        const currentTime = this.state.time;
        const roomRef = firebase.firestore().collection('Rooms')
        //.where('date', '==', currentDate);
        roomRef.get().then((querySnapshot) => {
            if(querySnapshot.empty){
                this.setState({
                    loading: false,
                });
            }
            else{
                querySnapshot.forEach( (doc) => {
                    const roomName = doc.get('roomName');
                    const roomID = doc.get('id');
                    listOfRoooms.push({
                        id: roomID,
                        title: roomName,
                    })
                    const bookingRef = firebase.firestore().collection('Rooms').doc(roomID)
                    .collection('bookings').where('date', '==', currentDate);
                    bookingRef.get().then((querySnapshot) =>{
                         if(querySnapshot.empty){
                             //Log it?
                             this.setState({
                                 loading:false,
                             })
                         }
                        else{
                            querySnapshot.forEach((doc) => {
                            const bookingID = doc.get('bookingID');
                            const bookingTitle = doc.get('title');
                            const startTime = doc.get('startTime');
                            const endTime = doc.get('endTime');
                            const bookedBy = doc.get('owner');
                            const bookingDate = doc.get('date');
                            if (startTime <= currentTime && endTime >= currentTime){
                                listOfUnavailableBookings.push({
                                    endTime: endTime,
                                    title: bookingTitle,
                                    owner: bookedBy,
                                    id: doc.id,
                                    }); 

                                unavailableRooms.push({
                                    title: roomName,
                                    id: roomID,
                                    endTime: endTime,
                                    owner: bookedBy,
                                    });

                                for (var i=0; i<listOfRoooms.length;i++){
                                    if(listOfRoooms[i].title == roomName){
                                        listOfRoooms.splice(i, 1);
                                    }}
                                }
                            // else{
                            //     listOfAvailableBookings.push({
                            //         startTime: startTime,
                            //         endTime: endTime,
                            //         title: bookingTitle,
                            //         room: roomName,
                            //         date: bookingDate,
                            //         description: 'Bokat av '+ bookedBy,
                            //         id: doc.id,
                            //         roomID: roomID,
                            //     });
                            // }
                        }); 
                }
        this.setState({
                availableRooms,
                unavailableRooms,
                loading: false,
                listOfAvailableBookings, 
                listOfUnavailableBookings,
                listOfRoooms,
            });
        });
        });  
        }
        })
        .catch((error) => {
            alert(error.toString());
          })
      }


      render(){
        const buttons = ['Lediga rum '+ '('+this.state.listOfRoooms.length+')', 'Upptagna rum ' + '('+this.state.unavailableRooms.length+')'];
        const {selectedIndex} = this.state;
        if (this.state.loading) {
            return <ActivityIndicator size='large' />; // or render a loading icon
          }

        return(
            
            <View style={styles.mainContainer}>
            <ButtonGroup
                onPress = {this.updateIndex}
                selectedIndex = {selectedIndex}
                buttons = {buttons}
                buttonStyle={{height: 50, backgroundColor:BACKGROUND_GREY}}
                textStyle = {styles.title} 
                selectedButtonStyle = {{backgroundColor: GREEN}}
                />

                { this.state.selectedIndex == 0  
                ?   
                ( 
                    <List
                    containerStyle = {{ marginTop:20, borderTopWidth: 0, borderBottomWidth: 0, backgroundColor: BACKGROUND_GREY}}>
                    {this.state.listOfRoooms.length > 0 ?
                    (<FlatList 
                        style = {styles.availableRooms}
                        data = {this.state.listOfRoooms}
                        renderItem = {({item}) => 
                            <ListItem
                                title ={`${item.title}`}
                                titleStyle = {styles.availableRoomsText }
                                subtitle = {'Rummet är ledigt'}
                                onPress = {() => this.props.sendScreenInfo(item)}>
                            </ListItem>
                        }
                        keyExtractor={(item, index) => index.toString()}
                        />)
                        : 
                        (<Text style = {styles.title}> Det finns inga rum lediga just nu! </Text>)}
                    </List>)
                :
            
                    (<List
                        containerStyle = {{ marginTop:20, borderTopWidth: 0, borderBottomWidth: 0, backgroundColor: BACKGROUND_GREY}}>
                        {this.state.unavailableRooms.length > 0 ? 
                        (<FlatList 
                            style = {styles.unavailableRoooms}
                            data = {this.state.unavailableRooms}
                            renderItem= {({item}) => 
                                <ListItem
                                    title ={`${item.title}`}
                                    titleStyle = {styles.unavailableRoomsText }
                                    subtitle = {'Nuvarande bokning slutar kl ' + item.endTime}
                                    onPress = {() => this.props.sendScreenInfo(item)}>
                                </ListItem>
                            }
                            keyExtractor={(item, index) => index.toString()}
                            />)
                            :
                            (<Text style = {styles.allRoomsAvailable} > Inga rum är upptagna just nu! </Text>)}
                    </List>)} 

            </View>
        )
      }
    }

    const styles = StyleSheet.create({
        mainContainer: {
            flex: 1,
        },
        title:{
            fontSize: 16,
            color: WHITE,
            height: 40,
            marginTop: 30,
        },
        availableRooms: {
        },
        availableRoomsText: {
            color: GREEN,
            fontSize: 18,
        },
        unavailableRoomsText: {
            color: WHITE,
            fontSize: 18
        },
        allRoomsAvailable: {
            color: WHITE,
            fontSize: 18,
            alignSelf: 'center',
            marginTop: 60,
        }
    })