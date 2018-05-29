import React,{Component} from 'react';
import {Platform,Keyboard,Animated, StyleSheet, TextInput, Text, View, Button, Alert, TouchableOpacity, TouchableHighlight, Modal, KeyboardAvoidingView } from 'react-native';
import firebase from 'react-native-firebase';
import Ionicons from "react-native-vector-icons/Ionicons";
import {GREEN, WHITE, GREY1, RED, TABBAR_GREY, BACKGROUND_GREY, theWindow} from '../styles';
import Spinner from './Spinner';


export default class LoginHelp extends Component{
    constructor(){
        super();
        this.state= {
            modalVisible: false,
            email: '',
            submitted: false,
        };

    }


    setModalVisible(visible) {
        this.setState({modalVisible: visible});
      }

    resetFirebasePassword(){
        firebase.auth().sendPasswordResetEmail(this.state.email)
                .then(() => {
                    this.setState({submitted: true})// Email sent.
                })
                .catch((error) => {
                    this.setState({errorText: error.toString()}) // An error happened.
                })
        
    }

    renderSpinnerAndErrorText(){
        if(this.state.loading){
            return <Spinner/>;
        }else{
            return <Text style= {styles.errorText}>{this.state.errorText}</Text>;
        }
    }

    renderModalContent(){
        if(!this.state.submitted){
            return(
        
            <KeyboardAvoidingView style= {styles.notSubmittedContent} behavior= 'padding' >
                <Text style= {styles.infoTextTitle}>Har du glömt ditt lösenord?{'\n'}</Text>
                <Text style= {styles.infoText}>
                En länk för att välja nytt lösenord kommer skickas till mejladressen du anger. {'\n'}
                </Text>
                <View style={{paddingTop: 60, alignItems: 'center'}}>{this.renderSpinnerAndErrorText()}</View>
                
                <View style={styles.formContainer}>
                <View position='absolute' style= {{paddingTop:10, paddingLeft:15}}> <Ionicons name='ios-mail-outline' size={20} color={GREY1} /> </View>
                    <TextInput
                    autoCapitalize= 'none'
                    autoCorrect={false}
                    placeholder={'emailadress'}
                    placeholderTextColor= {TABBAR_GREY}
                    secureTextEntry={false}
                    value={this.state.email}
                    onChangeText={email => this.setState({ email })}
                    style= {styles.inputStyle}
                    keyboardType = 'email-address'
                    />
                </View>
                
          <TouchableHighlight
            style= {styles.submittButtonContainer}
            onPress={() => {this.resetFirebasePassword();}}>
            <Text style= {styles.infoText}>Återställ lösenord</Text>
          </TouchableHighlight>
        </KeyboardAvoidingView>
        
        );}
        else{
            return(
                <View style = {styles.submittedContent}>
                <Text style= {styles.submittedInfo}>Ett mejl har skickats till den angivna emailadressen!</Text>
                </View>
            );}
       }
       

    render(){
    return(
        <View style={{ paddingBottom: this.keyboardHeight, justifyContent: 'center' }}>
        <Modal
          animationType="swipe"
          transparent={true}
          visible={this.state.modalVisible}
          style={styles.modalContainer}
        >
          <View style={styles.modalContainer}>
            
            <Ionicons name='ios-lock-outline' size={120} color={WHITE} /> 
            
            {this.renderModalContent()}
          </View>
          <TouchableOpacity style={{alignItems: 'center', backgroundColor: BACKGROUND_GREY, marginBottom: 10}} 
          onPress= {() => this.setModalVisible(!this.state.modalVisible)}> 
                <Text style = {styles.closeModal}> Tillbaka till inloggningen </Text>
                <Ionicons name='ios-arrow-down-outline' size={40} color={GREY1} />
          </TouchableOpacity>
        </Modal>

        <TouchableOpacity style ={[styles.buttonTextStyle, this.state.modalVisible? {backgroundColor:BACKGROUND_GREY} : {}]}
          onPress={() => {
            this.setModalVisible(true);
          }}>
          <Text style={[styles.buttonTextStyle, this.state.modalVisible? {color:BACKGROUND_GREY} : {color: GREY1}]}>Glömt lösenord?</Text>
        </TouchableOpacity>
        </View>
    );
    }
}

const styles = StyleSheet.create({
    modalContainer:{
       //flex:1,
        backgroundColor: BACKGROUND_GREY, 
        height: theWindow.height- 50,
        width: theWindow.width,
        //alignSelf: 'center',
        alignItems: 'center',
       justifyContent: 'space-around',
        paddingHorizontal: 50, 
        paddingTop: 100,
    },
    notSubmittedContent:{
        flex: 1, 
        paddingTop: 40, 
        //justifyContent: 'space-around',
    },
    submittedContent:{
        alignSelf: 'flex-start', 
        justifyContent: 'center', 
        alignItems: 'center',
    },
    buttonTextStyle: {
        fontSize: 12,
        //paddingTop: 20,
    },
    infoTextTitle:{
        color: WHITE,
        fontSize: 22,
        textAlign: 'center',
    },
    infoText: {
        color: WHITE,
        fontSize: 12,
        textAlign: 'center',
    },
    submittButtonContainer: {
        backgroundColor: GREEN,
        marginTop: 10,
        borderRadius: 20,
        width: 250,
        height: 40,
        padding: 1,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent:'center'
      },
    buttonContainer: {
        margin: 10,
        borderRadius: 20,
        width: 250,
        padding: 1,
        alignSelf: 'flex-start',
      },
    submittedInfo:{
        color: WHITE,
        fontSize: 24,
        alignSelf: 'center',
        textAlign: 'center',
    },
    // emailInput:{
    //     backgroundColor: WHITE,
    //     borderColor: TABBAR_GREY,
    //     borderRadius: 20,
    //     borderWidth: 1, 
    //     padding: 10, 
    //     paddingLeft:20, 
    //     color: BACKGROUND_GREY,
    //     fontSize: 10, 
    //     marginTop: 20, 
    //     marginBottom: 20, 
    // },
    submittButton:{
        backgroundColor: GREEN, 
        padding: 10,
        borderRadius: 20,
        alignItems: 'center'
    },
    errorText:{
        color: RED,
        fontSize: 12,
        fontWeight: 'bold',
    },
    formContainer:{
        alignSelf: 'center',
        borderRadius: 20,
        margin: 5,
        borderColor: GREY1,
        borderWidth: 0.5,
        width: 250,
        paddingLeft: 40, 
    },
    inputStyle: {
        paddingRight: 5,
        paddingLeft: 5,
        paddingBottom: 2,
        color: WHITE,
        fontSize: 10,
        height: 40
    },
    closeModal:{
        color: GREY1,
        fontSize: 14,
        textAlign: 'center',
    }
});