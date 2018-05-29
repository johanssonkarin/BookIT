import React, {Component} from 'react';
import { StyleSheet, Platform, Image, Text, TextInput, TouchableOpacity, View, Button, Alert, Modal } from 'react-native';
import {TABBAR_GREY,GREEN, WHITE, GREY1} from '../../styles';
import Ionicons from "react-native-vector-icons/Ionicons";



export default class HeaderRightconst extends Component {
  constructor({iconName}){
    super()
    this.state = {
      iconName,
      modalVisible: false,
    }
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

 render(){
  return (
    <View>
    <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            alert('Modal has been closed.');
          }}>
          <View style={{marginTop: 22}}>
            <View>

              <TouchableOpacity
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text>Hide Modal</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

    <TouchableOpacity 
      onPress = {() => this.props.onPress()}
      style = {styles.container}
    >

         <Ionicons name={this.state.iconName} size={25} color={WHITE} />
         
    </TouchableOpacity>
    </View>
);
}
}

  const styles = StyleSheet.create({
    container: {
      paddingRight: 15, 
    },
    button: {
      left: 100,
      top: 5,
      position: 'relative',
    }
  });