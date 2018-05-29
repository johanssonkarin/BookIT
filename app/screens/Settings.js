import React,{Component} from 'react';
import { StyleSheet, ScrollView, Image, Text, View, Button, Alert } from 'react-native';
import { List, ListItem} from 'react-native-elements';
import {ScreenHeader} from '../components/ScreenHeader';
import LogoutButton from '../components/LogoutButton';
import ResetPassword from '../components/ResetPassword';
import {WHITE,TABBAR_GREY, GREY1, BACKGROUND_GREY, GREEN, GREY2} from '../styles';

export default class extends Component {
constructor(props){
  super(props);
}

  render(){
    return(
        <View style={ styles.mainContainer}>
            <View style= {styles.buttonContainer}>
            <ResetPassword/>
            </View>
            <View style= {styles.buttonContainer}>
            <LogoutButton/>
            </View>
        </View>
 ); }
}
    
  const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: BACKGROUND_GREY,
    },
    buttonContainer: {
      backgroundColor: GREY2,
      borderColor: WHITE,
      borderWidth: 1,
      marginTop: 20,
      borderRadius: 20,
      width: 250,
      height: 40,
      padding: 1,
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent:'center'
    },
  });
