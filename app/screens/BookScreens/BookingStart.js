import React from 'react';
import { StyleSheet, Platform, Image, Text, TextInput, TouchableOpacity, View, Button, Alert } from 'react-native';
import {TABBAR_GREY,GREEN, WHITE, GREY1, BACKGROUND_GREY, RED} from '../../styles';
import {BookingNavigator} from '../../config/router';
import {Divider } from 'react-native-elements';
import BookingCalendar from '../../components/BookingCalendar';




export default class BookingStart extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          isSelected: false,
          room: '',
          date: '',
        };
    }


    onDateChanged(newDate) {
      if(newDate== ''){
        this.setState({date:'', isSelected:false})
      }else{
        this.setState({date:newDate, isSelected:true})
        this.props.navigation.setParams({date: newDate})
      }
    }

    renderTextOrDate(){
      if (!this.state.isSelected){
        return (
          <Text style = {{color: RED, fontSize: 18}}> Välj ett datum </Text>
        );
      } else {
        return(
          <Text style = {{color: WHITE, fontSize: 24}} > {this.state.date} </Text>
        );
      }
    }
  
    render() {
      return (
        <View style={ styles.mainContainer}> 
        <BookingCalendar
            initialDate={this.state.date} 
            callbackParent={(newDate) => this.onDateChanged(newDate)}
            />
        
      
         <View style={[styles.buttonContainer, (!this.state.date == '') ? styles.selected : styles.notSelected]}>
         <Button
          disabled = {(!this.state.isSelected)}
          title='Vidare'
          color= {WHITE}
          onPress={() => this.props.navigation.navigate('BookingDetails', {date: this.state.date})}
        />
        </View>
        </View>
      );
    }
  }

//   <View style = {styles.dateText}>
//   {this.renderTextOrDate()}
// </View>

  const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: BACKGROUND_GREY,
      justifyContent: 'space-around',
      alignItems: 'stretch',

    },
    buttonContainer: {
        alignSelf: 'center',
        margin: 10,
        borderRadius: 20,
        width: 250,
        padding: 1,
      },
      dateText:{
        alignItems: 'center',
        justifyContent: 'center',
      },
      selected: {
        backgroundColor: GREEN,
      },
      notSelected: {
        backgroundColor: GREY1,
      },
  });