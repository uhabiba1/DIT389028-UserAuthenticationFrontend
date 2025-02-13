import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ onLogout }) => {
    
    const logoutHandler = async () => {
        try {
            // Remove token from AsyncStorage after loggin out
            await AsyncStorage.removeItem('authToken');
            console.log('removed token after log out');
           
            onLogout(false); // Update the login status to false            
        } catch (error) {
            console.error('Error logging out', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.welcomeText}>Welcome to HomeScreen!</Text>
            
            <TouchableOpacity style={styles.button} onPress={logoutHandler}>
                <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ebebeb' },
    welcomeText: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
    button: { backgroundColor: 'black', padding: 10, borderRadius: 5 },
    buttonText: { color: 'white', fontSize: 16 },
});

export default HomeScreen;
