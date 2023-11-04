
import React,{useState} from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer,useRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screen/LoginScreen';
import SignupScreen from '../screen/SignupScreen';
import WelcomeScreen from '../screen/WelcomeScreen';
import FirstScreen from '../screen/FirstScreen';





const Stack = createNativeStackNavigator();

function MainNavigator() {
   
  const [iseUserLogin,setIsUserLogin]=useState(false);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        
       
        <Stack.Screen name="First" component={FirstScreen} options={{headerShown:false}} />
       
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}} />
       

       <Stack.Screen name="Signup" component={SignupScreen} options={{headerShown:false}} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{headerShown:false}} />
       
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainNavigator;