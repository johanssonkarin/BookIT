import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import {WHITE,GREY1,TABBAR_GREY,RED, GREEN, BACKGROUND_GREY} from '../styles';


const TitledInput = ({ label, value, onChangeText, placeholder, secureTextEntry, keyboardType }) => {

    const { inputStyle, labelStyle} = styles;

    return (
        
            <TextInput
                autoCapitalize= 'none'
                autoCorrect={false}
                placeholder={placeholder}
                placeholderTextColor= {TABBAR_GREY}
                secureTextEntry={secureTextEntry}
                value={value}
                onChangeText={onChangeText}
                style={inputStyle}
                keyboardType = {keyboardType}
            />
    );
};

const styles = {
    inputStyle: {
        paddingRight: 5,
        paddingLeft: 5,
        paddingBottom: 2,
        color: WHITE,
        fontSize: 10,
        height: 40
    },
};

export { TitledInput };