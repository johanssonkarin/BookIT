import React, { Component } from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import firebase from 'react-native-firebase';
import {Agenda} from 'react-native-calendars';
import moment from 'moment/min/moment-with-locales';
import {GREEN,GREY1,WHITE, TABBAR_GREY, BACKGROUND_GREY, GREY2} from '../styles'

export default class RoomAgenda extends Component {
  constructor({selectedRoomID}) {
    super();
    this.state = {
      today: moment().locale('sv').format('L'),
      now: moment().locale('sv').format('LT'),
      items: {},
      roomID: selectedRoomID,
    };

    this.ref = firebase.firestore().collection('Bookings').where('roomID','==', this.state.roomID)
  }

  componentWillMount(){
   this.createEmptyItemsArray()
   this.loadItems()
  }

  onItemPress(item){
    //alert(item.name)
  }

  checkIfNow(date,bookingTime, bookingEnd){
    if (date == this.state.today){
      if(bookingTime < this.state.now &&  this.state.now < bookingEnd){
        return true;
      }
    } else {return false;}
  }

  createEmptyItemsArray(){
    for (let i = -15; i < 85; i++) {
      const time = moment().valueOf() + i * 24 * 60 * 60 * 1000;
      const strTime = this.timeToString(time); //strTime ex 2018-05-31
        this.state.items[strTime] = [];
    }
  }

  loadItems() {
    this.createEmptyItemsArray()

    this.ref.get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const date = doc.get('date');
        const roomName = doc.get('room');
        const information = doc.get('description');
        const bookingTitle = doc.get('title');
        const bookingTime = doc.get('startTime');
        const bookedBy = doc.get('ownerName');
        const bookingEnd = doc.get('endTime');
        const isNow = this.checkIfNow(date, bookingTime, bookingEnd)
        if (!this.state.items[date]) {
          this.state.items[date] = [];}
            this.state.items[date].push({
                time: bookingTime + ' - ' + bookingEnd,
                name: bookingTitle,
                room: roomName,
                text: 'Bokat av '+ bookedBy,
                id: doc.id,
                height: 90,
                isNow: isNow,
            })
            this.state.items[date].sort((a, b) => { 
              return b.time < a.time ?  1 // if b should come earlier, push a to end
                  : b.time > a.time ? -1 // if b should come later, push a to begin
                  : 0;                   // a and b are equal
          });
      })
  })
    .catch((error) => {
        alert(error.toString());
      })
  
      const newItems = {};
      Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
      this.setState({
        items: newItems
      });
  }

  render() {
    return (
      <Agenda
        items={this.state.items}
        selected={this.state.today}
        renderItem={this.renderItem.bind(this)}
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}
        firstDay={1} //week starts on monday instead of sunday
        theme={{
            backgroundColor: GREY1,
            textSectionTitleColor: GREEN,
            dayTextColor: WHITE,
            todayTextColor: GREEN,
            selectedDayTextColor: WHITE,
            monthTextColor: WHITE,
            selectedDayBackgroundColor: GREEN,
            arrowColor: WHITE,
            calendarBackground: GREY2,
            agendaDayTextColor: GREEN,
            agendaDayNumColor: WHITE,
            agendaTodayColor: GREEN,
            agendaKnobColor: GREEN,
            dotColor: GREEN,

          }}
          // agenda container style
          style={{
              height: 100,
            }}
      />
    );
  }


  renderItem(item) {
    return (
    <TouchableOpacity onPress={() => this.onItemPress(item)}>
      <View style={[styles.item, {height: item.height}, item.isNow ? {backgroundColor: GREEN} : {backgroundColor: GREY1, borderColor: WHITE, borderWidth: 1}]}>
      <Text style = {[item.isNow ? {color: WHITE} : {color: GREEN}]}>{item.time} </Text>
      <Text style = {[styles.itemName]}>{item.name}{'\n'}</Text>
      <Text style = {styles.itemOwner}>{item.text}</Text>
      </View></TouchableOpacity>
    );
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}><Text style= {{color: WHITE}}>Inget bokat</Text></View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: BACKGROUND_GREY,
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  emptyDate: {
    backgroundColor: GREY1,
    height: 20,
    flex:1,
    borderRadius: 5,
    padding: 10,
    paddingTop: 20, 
    marginRight: 10,
    marginTop: 17,
  }, 
  itemName:{
    color: WHITE,
    fontSize: 18,
    paddingTop: 5,
  },
  itemOwner:{
    color: WHITE,
    fontSize: 10,
    alignSelf: 'flex-end',
    marginTop: -5,
  },
});

import {LocaleConfig} from 'react-native-calendars';

LocaleConfig.locales['sv'] = {
  monthNames: ['Januari','Februari','Mars','April','Maj','Juni','Juli','Augusti','September','Oktober','November','December'],
  monthNamesShort: ['Jan','Feb','Mar','Apr','Maj','Jun','Jul','Aug','Sept','Okt','Nov','Dec'],
  dayNames: ['Tisdag','Onsdag','Torsdag','Fredag','Lördag','Söndag', 'Måndag'],
  dayNamesShort: ['Sön','Mån','Tis','Ons','Tors','Fre','Lör',]
};

LocaleConfig.defaultLocale = 'sv';