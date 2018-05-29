import React from 'react';
import { StyleSheet, Platform, Image, Text, TextInput, TouchableHighlight, View, Button, Alert } from 'react-native';
import {TABBAR_GREY,GREEN, WHITE, GREY1, BACKGROUND_GREY} from '../../styles';
import Ionicons from "react-native-vector-icons/Ionicons";
import { StackActions, NavigationActions } from 'react-navigation';


export default class BookingSummary extends React.Component {
  constructor(){
    super();
    this.state = {
        // date: this.props.navigation.state.params.date,
        // room: this.props.navigation.state.params.room,
        // roomID: this.props.navigation.state.params.roomID,
        // title:'',
        // descripton: '',
      }
  }

//   <TouchableHighlight 
//             style={styles.buttonContainer}
//             onPress={() => this.props.navigation.navigate('Profile')}>
//             <Text style= {styles.buttonText}>
//             Visa bokningar
//             </Text>
//             </TouchableHighlight>



    render() {
        return(
        <View style={ styles.mainContainer }>
        <View style={ styles.infoContainer }>
          <Text style= {styles.infoText}> Bokat! </Text>
          <Ionicons name='ios-checkmark-circle' size= {80} color= {GREEN}/>
        </View>
        <View style={ styles.actionContainer }>
        <TouchableHighlight 
            style={styles.buttonContainer}
            onPress={() => this.props.navigation.dispatch(NavigationActions.reset({
                index: 0,
                //key: null,
                actions: [NavigationActions.navigate({ routeName: 'BookingStart' })]
            }))}>
            <Text style= {styles.buttonText}>
            Ny bokning
            </Text>
            </TouchableHighlight>
            
        </View>
        </View>
    );}
  }

  const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: BACKGROUND_GREY,
      justifyContent: 'space-around',
      alignItems: 'stretch',

    },
    infoContainer:{
        alignItems:'center',
        justifyContent:'center',
        flex:1,
    },
    infoText:{
        color: WHITE,
        fontSize: 42,
        margin: 20,
    },
    buttonContainer: {
        alignItems: 'center',
        margin: 10,
        borderRadius: 20,
        width: 150,
        backgroundColor: GREEN,
      },
    actionContainer:{
        flexDirection: 'row',
        justifyContent:'center',
        alignItems: 'center',
        marginBottom: 70,
    },
    buttonText:{
        color:WHITE,
        fontSize: 12,
        padding: 10,
    }
});