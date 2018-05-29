import React from 'react';
import { StyleSheet, Platform, Animated, Image, Text, TextInput, TouchableOpacity, View, Keyboard, KeyboardAvoidingView } from 'react-native';

import LoginForm from '../components/LoginForm';
import LoginHelp from '../components/LoginHelp';
import { BACKGROUND_GREY, WHITE, GREEN, IMAGE_HEIGHT, IMAGE_HEIGHT_SMALL, RED} from '../styles';

export default class Login extends React.Component {
constructor(){
  super();

  this.state= {errorText:''}
  this.keyboardHeight = new Animated.Value(0);
  this.imageHeight = new Animated.Value(IMAGE_HEIGHT);
}

componentWillMount () {
  if (Platform.OS=='ios'){
   this.keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
   this.keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
  }else{
   this.keyboardWillShowSub = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
   this.keyboardWillHideSub = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
  }
 }


 componentWillUnmount() {
  this.keyboardWillShowSub.remove();
  this.keyboardWillHideSub.remove();
}

keyboardWillShow = (event) => {
  Animated.parallel([
    Animated.timing(this.keyboardHeight, {
      duration: event.duration,
      toValue: event.endCoordinates.height,
    }),
    Animated.timing(this.imageHeight, {
      duration: event.duration,
      toValue: IMAGE_HEIGHT_SMALL,
    }),
  ]).start();
};

keyboardWillHide = (event) => {
  Animated.parallel([
    Animated.timing(this.keyboardHeight, {
      duration: event.duration,
      toValue: 0,
    }),
    Animated.timing(this.imageHeight, {
      duration: event.duration,
      toValue: IMAGE_HEIGHT,
    }),
  ]).start();
};


  
    render() {
      return (
        <View style= {styles.mainContainer}>
        <Animated.View style={[{flex:1}, { paddingBottom: this.keyboardHeight}]}>
        <Animated.Image source={require('../images/icon.png')} style={[styles.logo, { height: this.imageHeight }]} />
        
        <Text style={styles.welcome}>
          Välkommen till BookIT!{'\n'} 
        </Text>
        <LoginForm/>
        
        </Animated.View>
        <View style = {{}}>
        <LoginHelp/>
        </View>
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      paddingTop: 70,
      paddingBottom: 70, 
      justifyContent: 'space-around',
      alignItems: 'center',
      backgroundColor: BACKGROUND_GREY,
    },
    logo: {
      resizeMode: 'contain',
      marginBottom: 16,
    },
    welcome: {
      fontSize: 24,
      textAlign: 'center',
      margin: 10,
      color: WHITE,
    },
  });