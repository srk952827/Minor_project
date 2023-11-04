import { StyleSheet, Text, View,TextInput,TouchableOpacity, Alert,StatusBar } from 'react-native'
import React ,{useState} from 'react'
import auth from '@react-native-firebase/auth';
import {useNavigation,StackActions} from '@react-navigation/native';

export default function SignupScreen() {
  const [email,setemail]=useState('');
  const [password,setpassword]=useState('');
  const [message,setmessage]=useState('')
  const navigation=useNavigation();
  const handlesignup =async()=>{
    try {
      if(email.length>0 && password.length >0){
        const isUserCreated=await auth().createUserWithEmailAndPassword(email,password);
        setemail('');
        setpassword('')
        navigation.dispatch(StackActions.replace('Welcome'));
      }
      else{
       Alert.alert("Please Enter Required Data")
      }
    } catch (err) {
      setmessage(err.message);
    }
  }
  return (
    <>
    <View style={styles.container}>
    <StatusBar hidden={true}/>
       <Text style={styles.chatlist}>SignUp</Text>
       <TextInput
          
          style={styles.inputbox}
          placeholder="Enter Email"
          onChangeText={(value) => setemail(value)}
          value={email}
        />
       <TextInput
          style={styles.inputbox}
          placeholder="Enter Password"
          onChangeText={(value) => setpassword(value)} secureTextEntry={true}
          value={password}
        />
         <TouchableOpacity style={styles.addbtn} onPress={()=>handlesignup()}>
        <Text style={styles.btntext}>SignUp</Text>
         </TouchableOpacity>
         <TouchableOpacity onPress={()=>{
          navigation.navigate('Login');
         }}>
         <Text style={styles.already}>Already have an account</Text>
      </TouchableOpacity>
      <Text style={styles.error}>{message}</Text>
      <View style={styles.footer}>
        <Text style={styles.footertxt}>Copyright © 2023 || All Right Reserved</Text>
      </View>
    </View>
    </>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    backgroundColor:'#cde9f9',
    paddingTop:40
        
  },
  chatlist:{
    padding:10,
    fontSize:20,
    fontWeight:'600',
    textAlign:'center',
    color:'#094161'
  },
  inputbox: {
    backgroundColor:'#fff',
    height: 40,
    borderRadius: 20, // Round the corners of the input box
    borderWidth: 1,
    borderColor: '#ccc', // Add a border for a visual separation
    paddingHorizontal: 10,
    marginVertical:10,
    marginHorizontal:10,
    
   
  },
  addbtn:{
    
    backgroundColor:'#0e80c1',
    alignItems:'center',
    padding:10,
    marginVertical:10,
    marginHorizontal:10,
    borderRadius:20
  },
  btntext:{
    color:'#fff'
  },
  already:{
    color:'blue',
    textAlign:'center',
    fontSize:15,
    fontWeight:'600',
    marginTop:12
    
  },
  error:{
      color:'red',
      padding:10
  },
  footer:{
    flex:1,
    alignItems:'center',
    justifyContent:"flex-end",
    
  },
  footertxt:{
    marginBottom:20
  }
})