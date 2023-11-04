import { StyleSheet, Text, View,TextInput, Dimensions,TouchableOpacity,StatusBar,FlatList,Alert, ScrollView, SafeAreaView } from 'react-native'
import React,{useEffect,useState} from 'react'
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import {useRoute,useNavigation,StackActions} from '@react-navigation/native';


export default function WelcomeScreen() {
  const [inputTextValue,setInputValue]=useState('');
  const [list,setList]=useState([]);
  const [mydata,setmydata]=useState(null);
  const rout=useRoute();
  const navigation=useNavigation()
 
  useEffect(() => {
    getDatabase();
  }, [])
  const getDatabase=async()=>{
    try{
       const data= await database().ref('Users').on('value',(snapshot)=>{
         const data =snapshot.val();
         if(data){
          const dataArray=Object.values(data);
          setList(dataArray);
         }
       });
    }
    catch(err){
       console.log(err);
    }
  }
  const handleaddData = async()=>{
      try{
        const email=auth().currentUser;
        if(inputTextValue.length >0){
          
          const index=list.length;
        database().ref(`Users/${index}`).set({
          Email:email.email,
          Meassage :inputTextValue,
          
        })
       
        setInputValue('');
        }
        else{
          Alert.alert("Write somethin!")
        }
      }
      catch(err){
       console.log(err)
      }
  }
  
  return (
    <>
    
    <View style={styles.container}>
      <StatusBar hidden={true}/>
     
      <Text style={styles.chatlist}>Conversa</Text>
      <View style={styles.log}>
      <Text style={styles.userr}>Welcome : {auth().currentUser.email}</Text>
        <TouchableOpacity style={styles.logoutbtn} onPress={async()=>{
          await auth().signOut();
           navigation.dispatch(StackActions.popToTop());
        }}>
          <Text style={styles.logoutbtntxt}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardContainer}>
           <SafeAreaView>

          <FlatList data={list.filter(item => item !== null)} style={styles.flat}  
         keyExtractor={(item, index) => (item && item.id) || index.toString()}
          renderItem={(item)=>{
            if(item){

              return ( <View style={styles.card}>
                       
                        <Text style={styles.cardText1}>
                          {item.item.Email}
                        </Text>
                        <Text style={styles.cardText2}>
                          {item.item.Meassage}
                        </Text>
                      </View>
              );
            }
            
            
          }}
        />
           </SafeAreaView>

      
      </View>
      
    </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputbox}
          placeholder="Type your message"
          value={inputTextValue}
          onChangeText={(value) => setInputValue(value)}
        />
      <TouchableOpacity style={styles.addbtn} onPress={handleaddData}>
        <Text style={styles.btntext}>Send</Text>
      </TouchableOpacity>
      </View>
      
    </>
  )
}
const {height,width} = Dimensions.get('screen');
const styles = StyleSheet.create({
  container:{
           flex:1,
           backgroundColor:'#cde9f9',
           
  },
  // inputbox:{
  //   height:30,
  //   borderRadius:15,
  //   borderWidth:2,
  //   marginTop:10,
  //   marginLeft:10,
  //   padding:10
  // },
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
  title:{
    textAlign:'center',
    backgroundColor:'blue',
    color:'#fff',
    fontSize:24,
    fontWeight:'600',
    padding:8
  },
  cardContainer:{
    flex:1,
    padding:10,
    
   
    
  },
  card:{
    
    marginVertical:8,
    backgroundColor:'#fff',
    padding:10,
    borderRadius:12,
    elevation:3,
   
    

  },
  chatlist:{
    padding:10,
    fontSize:20,
    fontWeight:'600',
    backgroundColor:'#0e80c1',
    color:'#fff',
    textAlign:'center'
  },
  cardText1:{
    color:'#04a84c',
    marginBottom:10

  },
  cardText2:{
    
      color:'#c731d3'
  },
  flat:{
    
  },
  inputContainer:{
   
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor:'#cde9f9', // Background color for the input box
  },
  inputbox: {
    flex: 1,
    height: 40,
    borderRadius: 20, // Round the corners of the input box
    borderWidth: 1,
    borderColor: '#ccc', // Add a border for a visual separation
    paddingHorizontal: 10,
    backgroundColor:'#fff'
  },
  userr:{
    marginLeft:10,
    fontSize:16,
    color:'#094161',
    
  },
  log:{
    alignItems:'center',
    flexDirection:'row',
    justifyContent:'space-between',
    
    
  },
  logoutbtn:{
    backgroundColor:'#0e80c1',
    marginRight:10,
    borderRadius:10,
    padding:10,
    marginTop:10,
    
  },
  logoutbtntxt:{
    color:'#fff',
  }
})