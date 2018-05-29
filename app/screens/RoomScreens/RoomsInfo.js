import React from 'react';
import { StyleSheet, Platform, Image, Text, ScrollView , View, Button, Alert } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import moment from 'moment/min/moment-with-locales';
import Ionicons from "react-native-vector-icons/Ionicons";
import {TABBAR_GREY,GREEN, WHITE, GREY1, BACKGROUND_GREY, RED} from '../../styles';

import {ScreenHeader} from '../../components/ScreenHeader';
import ListOfBookings from '../../components/ListOfBookings';
import AccordionRoom from '../../components/AccordionRoom';
import AvailableBookings from '../../components/AvailableBookings';

export default class RoomsInfo extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      agendaItems: {},
      selectedRoomID: this.props.navigation.state.params.roomID, 
    }
  }


    render() {
      return (
        <View style={styles.mainContainer}>
          <AccordionRoom 
            selectedRoomID = {this.state.selectedRoomID}
          />
          <AvailableBookings roomID= {this.state.selectedRoomID}/>
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      justifyContent: 'space-between',
      //alignItems: 'center',
      backgroundColor: BACKGROUND_GREY,
      //flexDirection: 'row'
    }
  });