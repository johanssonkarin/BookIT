import React,{Component} from 'react';
import { StyleSheet, ScrollView, Image, Text, View, Button, Alert, TouchableOpacity } from 'react-native';
import firebase from 'react-native-firebase'
import {GREEN, WHITE, GREY2} from '../styles';

export default class LogoutButton extends Component{

    onLogoutPress(){
        Alert.alert(
            'Logga ut',
            'Är du säker på att du vill logga ut?',
            [
              {text: 'Avbryt', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: 'Logga ut', onPress: () =>  firebase.auth().signOut()
              .then(() => {   
                // Gör någonting när användaren loggas ut            
              })
              .catch((error) => {
                Alert.alert(error.toString());
              })},
            ],
            { cancelable: true }) 

       }

    render(){
    return(
        <View >
        <TouchableOpacity onPress={ () => {this.onLogoutPress()}}
        style= {styles.buttonContainer}> 
        <Text style= {styles.buttonTextStyle}> Logga ut </Text> 
        </TouchableOpacity>
        </View>
    );
    }
}

const styles = StyleSheet.create({
    buttonTextStyle: {
        color: WHITE,
        paddingTop: 10,
        paddingBottom: 10,
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