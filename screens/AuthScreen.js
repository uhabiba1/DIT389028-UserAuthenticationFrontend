import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const API_URL = 'http://10.0.0.75:3000';

const AuthScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [isLogin, setIsLogin] = useState(true);

    // Store Token Securely
    const storeToken = async (token) => {
        try {
            await AsyncStorage.setItem('authToken', token);
        } catch (error) {
            console.error('Error storing token', error);
        }
    };

    // Reset the form fields after successful signup
    const resetFields = () => {
        setEmail('');
        setPassword('');
    };

    // Handle Signup or Login
    const onSubmitHandler = async () => {
        try {
            const endpoint = isLogin ? 'login' : 'signup';
            const response = await axios.post(`${API_URL}/${endpoint}`, { email, password });

            if (response.status === 200 || response.status === 201) {
                if (isLogin) {
                    await storeToken(response.data.token);
                } else {
                    // If it's a signup, reset the form after successful signup
                    resetFields();
                }
                setIsError(false);
                setMessage(response.data.message);
            }
        } catch (error) {
            setIsError(true);
            setMessage(error.response?.data?.message || 'Error processing request');
        }
    };

    return (
        <View style={styles.card}>
            <Text style={styles.heading}>{isLogin ? 'Login' : 'Sign Up'}</Text>
            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                />
                <TextInput
                    secureTextEntry
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                />
                <Text style={[styles.message, { color: isError ? 'red' : 'green' }]}>{message}</Text>
                <TouchableOpacity style={styles.button} onPress={onSubmitHandler}>
                    <Text style={styles.buttonText}>{isLogin ? 'Login' : 'Sign Up'}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonAlt} onPress={() => setIsLogin(!isLogin)}>
                    <Text style={styles.buttonAltText}>{isLogin ? 'Sign Up' : 'Log In'}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    card: { 
        flex: 1, backgroundColor: '#ebebeb', width: '80%', marginTop: '30%', marginBottom: '30%', borderRadius: 20, 
    },
    heading: { 
        fontSize: 30, fontWeight: 'bold', color: 'black', marginLeft: '10%', marginTop: '10%', paddingBottom: '5%'    
    },
    form: { 
        flex: 1, justifyContent: 'space-between', marginLeft: '5%', marginBottom: '70%',
    },
    input: { 
        width: '80%', borderBottomWidth: 1, borderBottomColor: 'black', paddingTop: 10, fontSize: 16, minHeight: 50 
    },
    button: { 
        width: '80%', backgroundColor: 'black', height: 40, borderRadius: 50, justifyContent: 'center', alignItems: 'center', 
        marginVertical: 5 
    },
    buttonText: { 
        color: 'white', fontSize: 16, fontWeight: '400' 
    },
    buttonAlt: { 
        width: '80%', borderWidth: 1, height: 40, borderRadius: 50, borderColor: 'black', justifyContent: 'center', 
        alignItems: 'center', marginVertical: 5 
    },
    buttonAltText: { 
        color: 'black', fontSize: 16, fontWeight: '400' 
    },
    message: { 
        fontSize: 16, marginVertical: '5%' 
    },
});

export default AuthScreen;
