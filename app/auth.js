import React, { Component } from 'react';
import { StyleSheet, ScrollView, Image, Text, View, Button, Alert, TouchableOpacity } from 'react-native';
import { AsyncStorage } from "react-native";
import firebase from 'react-native-firebase';

export const USER_KEY = "no key yet";

export const onSignIn = () => AsyncStorage.setItem(USER_KEY, 'true');

export const onSignOut = () => AsyncStorage.removeItem(USER_KEY); 

//-------------------- FIREBASE----------------------------------

export const updateUserKey = () => firebase.auth().currentUser.uid;



export const getCurrentUserName = () => {
    var userID = firebase.auth().currentUser.uid;
    
    firebase.firestore().collection('Users').doc(userID).get()
    .then((res) =>  {
          var firstname = res.get('firstname')
          var lastname = res.get('lastname')
          return (firstname + ' ' + lastname);
        });
}
  