import React, {Component} from 'react';
import { StyleSheet, Platform, Image, Text, ScrollView , View, Button, Alert } from 'react-native';
import { List, Header, ListItem, SearchBar } from 'react-native-elements';
import Ionicons from "react-native-vector-icons/Ionicons";


export default class SearchingBar extends Component {
  
  //cancelButton() {
    //this.search.clear();
  //}

    render() {
      return (
        <View style = {styles.container}>
                <SearchBar
                    containerStyle = {styles.searchContainer}
                    inputStyle = {styles.inputSearchContainer}
                    round
                    autoCorrect={false}
                    lightTheme
                    clearIcon
                    cancelButtonTitle = 'Cancel'
                    //onChangeText={(text) => this.setState({text})}
                    //onClear = {(text) => this.search.clear({text})}
                    placeholder='Skriv in rum..' />
                }
      </View>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      //flex: 1,
      justifyContent: 'center',
      alignItems: 'flex-start',
      flexDirection: 'row',
    },
    searchContainer: {
     // flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },
    inputSearchContainer: {
      flex: 1,
    }
  });