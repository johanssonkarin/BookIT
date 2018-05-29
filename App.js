import React from 'react';
import { StyleSheet, Platform, Image, Text, TextInput, TouchableOpacity, View, Button, Alert } from 'react-native';
import firebase from 'react-native-firebase';
import Config from 'react-native-config';
import { YellowBox } from 'react-native'; //Takes away the isMounted bug warning
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader', 'Class RCTCxxModule', 'RTCBridge' ]);
console.disableYellowBox = true;


import { createRootNavigator } from "./app/config/router";
import { isSignedIn } from "./app/auth";



export default class App extends React.Component {
  constructor() {
    super();
    this.unsubscriber = null;
    this.state = { signedIn: false, checkedSignIn: false, user: null};
  }
  
  
  componentDidMount() {
    this.unsubscriber = firebase.auth().onAuthStateChanged((user) => {
      if(user){
        this.setState({signedIn:true})
      }else{
        this.setState({signedIn:false})
      }
      this.setState({checkedSignIn:true})
  });

   }
   

  componentWillUnmount(){
    this.unsubscriber();
  }


  render() {
    const { checkedSignIn, signedIn} = this.state;

    // The application is initialising
    if (!checkedSignIn) return null;
   
    const Layout = createRootNavigator(signedIn);
    return <Layout/>;
    
  }
}
