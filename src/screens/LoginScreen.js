import React from 'react';
import {
    View,
    Button,
    TextInput,
    StyleSheet,
    ActivityIndicator,
    Text,
    Alert,
} from 'react-native';
import firebase from '@firebase/app';
import '@firebase/auth';

import FormRow from '../components/FormRow';

export default class LoginScreen extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            mail: '',
            password: '',
            isLoading: false,
            message: '',
        }
    }

    componentDidMount() {
        const firebaseConfig = {
            apiKey: "AIzaSyDGoCtT8rQLM2Bk0gtnKz5yNO1WN84plNY",
            authDomain: "series-ac1d2.firebaseapp.com",
            databaseURL: "https://series-ac1d2.firebaseio.com",
            projectId: "series-ac1d2",
            storageBucket: "series-ac1d2.appspot.com",
            messagingSenderId: "861712560707",
            appId: "1:861712560707:web:eaaef607426bbc4a6c5af6",
            measurementId: "G-E8VDGTHKCD"
          };

        // Initialize Firebase
        if (firebase.apps.length === 0) {
            firebase.initializeApp(firebaseConfig);
        }
        //firebase.analytics();
    }

    //funções para deixar o input digitável;
    /*
    onChangeMail(mail) {
        this.setState({ mail })
    }

    onChangePassword(password) {
        this.setState({ password })
    }*/

    //função input genérico
    onChangeHandler(field, value) {
        this.setState({
            [field]: value
        });
    }

    tryLogin() {
        this.setState({ isLoading: true, message: '' });
        const { mail, password } = this.state

        const loginUserSuccess = user => {
            this.setState({ message: "Sucesso" })
        }

        const loginUserFailed = error => {
            this.setState({
                message: this.getMessageByErrorCode(error.code)
            });
        }

        firebase
            .auth()
            .signInWithEmailAndPassword(mail, password)
            .then(loginUserSuccess)
            .catch(error => {
                if (error.code === 'auth/user-not-found') {
                    Alert.alert(
                        'Usuário não encontrado',
                        'Deseja criar um cadastro com as informações inseridas?',
                        [{
                            text: 'Não',
                            onPress: () => console.log('usuário não quer criar conta.'),
                            style: 'cancel' //IOS
                        }, {
                            text: 'Sim',
                            onPress: () => {
                                firebase
                                    .auth()
                                    .createUserWithEmailAndPassword(mail, password)
                                    .then(loginUserSuccess)
                                    .catch(loginUserFailed)
                            }
                        }],
                        { cancelable: false }
                    )
                } else {
                    loginUserFailed
                }
                
            })
            .then(() => this.setState({ isLoading: false }))
    }

    getMessageByErrorCode(errorCode){
        switch (errorCode) {
            case 'auth/wrong-password':
                return 'Senha incorreta';
            case 'auth/user-not-found':
                return 'Usuário não encontrado';
            default:
                return 'Erro desconhecido';
        }
    }

    renderButton() {

        if (this.state.isLoading)
            return <ActivityIndicator />;

        return (
            <Button
                title="Entrar"
                onPress={() => this.tryLogin()} />
        );
    }

    renderMessage() {
        const { message } = this.state;

        if(!message)
            return null;
        return (
            <View>
                <Text>{message}</Text>
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <FormRow first>
                    <TextInput 
                        style={styles.input}
                        placeholder="user@gmail.com"
                        value={this.state.mail}
                        onChangeText={value => this.onChangeHandler('mail', value)}
                    />
                </FormRow>
                <FormRow last>
                    <TextInput 
                        style={styles.input}
                        placeholder="******" 
                        secureTextEntry
                        value={this.state.password}
                        onChangeText={value => this.onChangeHandler('password', value)}
                    />
                </FormRow>

                { this.renderButton() }
                { this.renderMessage() }
                
            </View>
        )
    }
};

const styles = StyleSheet.create({
    container: {
        paddingLeft: 10,
        paddingRight: 10
    },
    input: {
        paddingLeft: 5,
        paddingRight: 5,
        paddingBottom: 5,
    }
});