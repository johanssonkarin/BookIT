import React, {Component} from 'react';
import { StyleSheet, Platform, Image, Text, TextInput, TouchableHighlight, View, Button, Alert, Picker } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';
import Ionicons from "react-native-vector-icons/Ionicons";

import {TABBAR_GREY,GREEN, WHITE, GREY1, GREY2} from '../styles';
import ProfileAgenda from '../components/ProfileAgenda';


  export default class AccordionProfile extends Component {
    constructor(){
        super();
        this.state = {
            activeSection: false,
            collapsed: true,
            item: '',
          };   
    }
  
      toggleExpanded = () => {
        this.setState({ collapsed: !this.state.collapsed });
      }
    
      setSection(section) {
        this.setState({ activeSection: section });
      }
    
      renderHeader(section, i, isActive) {
        return (
          <Animatable.View duration={400} style={[styles.header, isActive ? styles.active : styles.inactive]} transition="backgroundColor">
           <Ionicons name= {isActive ? 'ios-arrow-dropdown-outline':'ios-arrow-dropright-outline'} size={18} color={WHITE} />  <Text style={styles.headerText}>     {section.title} </Text> 
          </Animatable.View>
        );
      }
    
      renderContent(section, i, isActive) {
        return (
          <Animatable.View duration={400}  style={[styles.content, isActive ? styles.active : styles.inactive]} transition="backgroundColor">
            {section.content}
          </Animatable.View>
        );
      }

      onBookingPressed(newItem) {
        this.props.onPress(newItem)
        this.setState({item:newItem, activeSection: false})
      }
    
      render() {
       var SECTIONS = [
          {
            title: 'Kalenderöversikt',
            content: <View style={styles.agendaContainer}> 
                        <ProfileAgenda onPress = {(newItem) => {this.onBookingPressed(newItem)}}/>
                     </View>,
          },
        ];

        return (
          
            <Accordion
              activeSection={this.state.activeSection}
              sections={SECTIONS}
              renderHeader={this.renderHeader}
              renderContent={this.renderContent}
              duration={400}
              onChange={this.setSection.bind(this)}
            />
          
        );
      }
    }
  
  const styles = StyleSheet.create({
    container: {
     flex: 1,
    },
    agendaContainer: {
      //flex: 1, 
      alignSelf: 'stretch',
      height: 800,
      marginBottom: 2,
    },
    title: {
      textAlign: 'center',
      fontSize: 40,
      fontWeight: '300',
      marginBottom: 20,
    },
    header: {
      flexDirection: 'row',
      backgroundColor: GREY2,
      padding: 10,
      borderBottomColor: WHITE,
      borderBottomWidth: 1,
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    headerText: {
      textAlign: 'center',
      fontSize: 12,
      fontWeight: '500',
      color: WHITE,
    },
    content: {
      flex:1,
      backgroundColor: WHITE,
    },
    active: {
      backgroundColor: GREEN,
    },
    inactive: {
      backgroundColor: GREY2,
    },
    selectTitle: {
      fontSize: 14,
      fontWeight: '500',
      padding: 10,
    },
    data: {
      color:WHITE,
      fontSize: 16,
      textAlign: 'center'
    }
  });