import { StyleSheet, Text, View,StatusBar, TouchableOpacity } from 'react-native'
import React,{useEffect} from 'react'
import auth from '@react-native-firebase/auth';
import {StackActions, useNavigation,useRoute}  from '@react-navigation/native';
export default function FirstScreen() {
    const navigation =useNavigation();
    useEffect(() => {
      setTimeout(() => {
        auth().onAuthStateChanged(user => {
          console.log('User:', user);
          if (user !== null && user !== undefined) {
            console.log('isNewUser:', user.isNewUser);
            if (user.isNewUser) {
              console.log('New User. Redirecting to FirstScreen');
              navigation.dispatch(StackActions.replace('First'));
            } else {
              console.log('Existing User. Redirecting to WelcomeScreen');
              navigation.dispatch(StackActions.replace('Welcome'));
            }
          } else {
            console.log('User is not authenticated. Redirecting to Login');
            navigation.dispatch(StackActions.replace('Login'));
          }
        });
      }, 3000);
    }, []);
    
    
  return (
    <View style={styles.container}>
        <StatusBar hidden={true}/>
      <Text style={styles.wlcm}>Welcome in...</Text>
      <Text style={styles.contxt}>Conversa</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'blue'

    },
    wlcm:{
        color:'#fff',
        fontSize:20,
        
    },
    contxt:{
        color:'#fff',
        fontSize:40,
        fontWeight:'700',
    },
    btn:{
        padding:10
    }

})