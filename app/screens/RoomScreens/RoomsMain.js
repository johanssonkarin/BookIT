import React from 'react';
import { StyleSheet, Platform, Image, Text, ScrollView , View, Button, Alert } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import moment from 'moment/min/moment-with-locales';
import Ionicons from "react-native-vector-icons/Ionicons";
import {TABBAR_GREY,GREEN, WHITE, GREY1, BACKGROUND_GREY, RED} from '../../styles';

import {ScreenHeader} from '../../components/ScreenHeader';
import ListOfBookings from '../../components/ListOfBookings';
import RoomList from '../../components/RoomList';

export default class Rooms extends React.Component {
  constructor(){
    super()
    this.state = {
      agendaItems: {},
      selectedRoomID: '', //konferensrummet nu vid test
    }
  }

  toNextScreen(item){
    this.props.navigation.navigate('RoomsInfo',{roomID: item.id, roomName: item.title})
  }

    render() {
      return (
        <View style={styles.mainContainer}>
          <RoomList sendScreenInfo ={(item) => this.toNextScreen(item)}/>
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    mainContainer: {
      paddingTop: 40, 
      flex: 1,
      justifyContent: 'center',
      //alignItems: 'center',
      backgroundColor: BACKGROUND_GREY,
      //flexDirection: 'row'
    }
  });

