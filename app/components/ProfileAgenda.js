import React, { Component } from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import firebase from 'react-native-firebase';
import {Agenda} from 'react-native-calendars';
import moment from 'moment/min/moment-with-locales';
import {GREEN,GREY1,WHITE, TABBAR_GREY, BACKGROUND_GREY, GREY2} from '../styles';

export default class ProfileAgenda extends Component {
  constructor() {
    super();
    this.state = {
      today: moment().locale('sv').format('L'),
      now: moment().locale('sv').format('LT'),
      items: {},
      user: firebase.auth().currentUser.uid,
    };

    this.ref = firebase.firestore().collection('Users').doc(this.state.user).collection('bookings')
  }

  componentWillMount(){
   this.createEmptyItemsArray()
   this.loadItems()
  }

  onItemPress(item){
    if(item.date < this.state.today){
      alert('datumet har passerat')
    } else if (item.date == this.state.today && item.time < this.state.now)  {
      alert('du måste avboka innan tiden har börjat :/')
    }
    else {
      this.props.onPress(item)
    }
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
        const roomID = doc.get('roomID');
        const information = doc.get('description');
        const bookingTitle = doc.get('title');
        const bookingTime = doc.get('startTime');
        const bookingEnd = doc.get('endTime');
        const isNow = this.checkIfNow(date, bookingTime, bookingEnd)
        if (!this.state.items[date]) {
          this.state.items[date] = [];}
            this.state.items[date].push({
                date: date,
                time: bookingTime + ' - ' + bookingEnd,
                info: information,
                name: bookingTitle,
                room: roomName,
                roomID: roomID,
                id: doc.id,
                height: 80,
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
      <View style={[styles.item, {height: item.height}, item.isNow ? {backgroundColor: GREEN} : {backgroundColor: BACKGROUND_GREY}]}>
      <Text style = {[item.isNow ? {color: WHITE} : {color: GREEN}]}>{item.time} </Text> 
      <Text style = {styles.itemRoom}>{item.room} </Text>
      <Text style = {[styles.itemName]}>{item.name}</Text>
      </View> </TouchableOpacity>
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
  itemRoom:{
    color: WHITE,
    fontSize: 12,
    alignSelf: 'flex-end',
    marginTop: -15,
  },
});