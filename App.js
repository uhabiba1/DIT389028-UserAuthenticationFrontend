import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthScreen from './screens/AuthScreen.js';
import HomeScreen from './screens/HomeScreen.js';

const Stack = createStackNavigator();

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Function to check login status from AsyncStorage
    const checkLoginStatus = async () => {
      try {
          const token = await AsyncStorage.getItem('authToken');
          setIsLoggedIn(!!token); // Set to true if token exists
      } catch (error) {
          console.error('Error checking login status:', error);
      }
    };

    useEffect(() => {
      checkLoginStatus(); // Check login status when the app starts
    }, []);

    // Handle login status change
    const handleLoginStatusChange = (status) => {
        setIsLoggedIn(status);
    };

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>            
            {isLoggedIn ? (
                    <Stack.Screen name="Home">
                        {(props) => <HomeScreen {...props} onLogout={handleLoginStatusChange} />}
                    </Stack.Screen>
                ) : (
                    <Stack.Screen name="Auth">
                        {(props) => <AuthScreen {...props} onLoginStatusChange={handleLoginStatusChange} />}
                    </Stack.Screen>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );

};

export default App;
