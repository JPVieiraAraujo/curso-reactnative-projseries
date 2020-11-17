import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

import FormRow from '../components/FormRow';

export default class LoginScreen extends React.Component {
    render() {
        return (
            <View>
                <FormRow>
                    <TextInput 
                        style={StyleSheet.input}
                        placeholder="user@gmail.com" 
                    />
                </FormRow>
                <FormRow>
                    <TextInput 
                        style={StyleSheet.input}
                        placeholder="******" 
                        secureTextEntry
                    />
                </FormRow>
            </View>
        )
    }
};

const style = StyleSheet.create({
    input: {
        paddingLeft: 5,
        paddingRight: 5,
        paddingBottom: 5,
    }
});