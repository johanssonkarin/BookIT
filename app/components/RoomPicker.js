import React, {Component} from 'react';
import { StyleSheet, Platform, Image, Text, TextInput, TouchableOpacity, View, Button, Alert, Picker } from 'react-native';
import {TABBAR_GREY,GREEN, WHITE, GREY1, BACKGROUND_GREY} from '../styles';
import BookingCalendar from '../components/BookingCalendar';

export default class RoomPicker extends Component {
  constructor({ initialRoom }){
    super();
    this.state = {
      selected: initialRoom,
    }
  }

  onRoomChanged(room) {
    this.props.callbackParent(room); // we notify our parent
  }
  
    render() {

      return (
        <View style = {styles.container}>
        <Picker
          color = {WHITE}
          style = {styles.picker}
          selectedValue={this.state.room}
          onValueChange={(itemValue, itemIndex) => {
            this.setState({selected: itemValue});
            this.onRoomChanged(itemValue);
            }}>
          <Picker.Item label="Konferensrummet" value="Konferensrummet" />
          <Picker.Item label="Spelrummet" value="Spelrummet" />
          <Picker.Item label="Skrubben" value="Skrubben" />
        </Picker>
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: BACKGROUND_GREY,
    },
    picker:{
      backgroundColor: BACKGROUND_GREY,
    }
  });