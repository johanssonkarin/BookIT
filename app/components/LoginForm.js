import React, { Component } from 'react';
import { View, Text, Button,KeyboardAvoidingView } from 'react-native';
import firebase from 'react-native-firebase';
import {TitledInput} from './TitledInput'; 
import {SignedIn} from '../config/router';
import Spinner from './Spinner';
import Ionicons from "react-native-vector-icons/Ionicons";
import {WHITE,GREY1,TABBAR_GREY, BACKGROUND_GRBACKGROUND_GREY,RED, GREEN} from '../styles';

class LoginForm extends Component {
    constructor(props){
        super(props);
        this.state = { 
            email: '', 
            password: '', 
            error: '', 
            loading: false 
        };
    }
    
    setErrorText(error){
        errorCode = error.code;
        errorMessage = error.message;
   
        this.setState({
            error: errorMessage, 
            loading:false
        });
      

    }
    
    onLoginPress() {

        this.setState({ error: '', loading: true });
 
        const { email, password } = this.state;
        firebase.auth().signInAndRetrieveDataWithEmailAndPassword(email, password)
            .then(() => { this.setState({loading:true, error:''})
                        })
            .catch((error) => { 
                this.setErrorText(error)      
            });
    }
    renderButtonOrSpinner() {
        if (this.state.loading) {
            return(  
            <View style = {styles.buttonContainer}>
            <Spinner/>
            </View>);
        }
        return (    <View style = {styles.buttonContainer}>
                        <Button  onPress={this.onLoginPress.bind(this)} 
                            title='Logga in'
                            color={WHITE}/> 
                    </View>);    
    }

    renderError(){
        if(this.state.error== ''){
          return null;
        }else{
          return <Text style={styles.errorTextStyle}>{this.state.error}</Text> ;
        }
      }

    render() {
        return (
            <View style={styles.container}>
            <View style={styles.formContainer}>
            <View position='absolute' style= {{paddingTop:10, paddingLeft:15}}><Ionicons name='ios-contact' size={20} color={GREY1}/> </View>
                    <TitledInput 
                        placeholder= 'användarnamn'
                        value={this.state.email}
                        onChangeText={email => this.setState({ email })}
                        keyboardType = {'email-address'}
                    />
            </View>
            <View style={styles.formContainer}>
            <View position='absolute' style= {{paddingTop:10, paddingLeft:15}}> <Ionicons name='ios-key' size={20} color={GREY1} /> </View>
                    <TitledInput
                        autoCorrect={false}
                        placeholder='lösenord'
                        secureTextEntry
                        value={this.state.password}
                        onChangeText={password => this.setState({ password })}
                    />
                    </View>
               
                    {this.renderError()}

                    {this.renderButtonOrSpinner()}
                
            </View>
        );
    }
}

const styles = {
    container:{
        flex: 1,
        justifyContent: 'center',
        textAlign: 'center',
        paddingHorizontal:20,
    },
    errorTextStyle: {
        color: RED,
        fontSize: 10,
        alignSelf: 'center',
        paddingHorizontal: 30,
    },
    buttonContainer: {
        backgroundColor: GREEN,
        marginTop: 10,
        borderRadius: 20,
        width: 250,
        height: 40,
        padding: 1,
        alignSelf: 'center',
        justifyContent:'center'
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
};

export default LoginForm;