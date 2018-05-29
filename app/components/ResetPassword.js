import React,{Component} from 'react';
import { StyleSheet, ScrollView, Image, Text, View, Button, Alert, TouchableOpacity } from 'react-native';
import firebase from 'react-native-firebase'
import {GREEN, WHITE} from '../styles';

export default class ResetPassword extends Component{

    onResetPress(){
        Alert.alert(
            'Nytt lösenord',
            'Är du säker på att du vill byta lösenord?',
            [
              {text: 'Avbryt', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: 'Nytt', onPress: () =>  { this.resetUserPassword()}}
            ],
            { cancelable: true }) 
        }

    resetUserPassword(){
        const emailAddress = firebase.auth().currentUser.email;
                firebase.auth().sendPasswordResetEmail(emailAddress)
                .then(() => {
                    Alert.alert('Följ länken som skickats till din mejl');// Email sent.
                })
                .catch((error) => {
                    Alert.alert(error.toString()); // An error happened.
                })
    }



    render(){
    return(
        <View >
        <TouchableOpacity onPress={ () => {this.onResetPress()}}> 
        <Text style= {styles.buttonTextStyle}> Byt lösenord </Text> 
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
});