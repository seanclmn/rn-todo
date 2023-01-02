import { View, Text, TextInput, StyleSheet, Button } from "react-native"
import {useState} from 'react'
import { auth, db } from "../Firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";

const styles = StyleSheet.create({
  logincontainer: {
    marginTop: "auto",
    marginBottom: "auto",
    width: "100%",
    display: 'flex',
    flexDirection: 'column',
    alignItems: "center"
  },
  input: {
    height: 40,
    width: 300,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export const LogIn = () => {
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")

  const signInUser = () =>{
    signInWithEmailAndPassword(auth,email,password).then((data)=>{
    console.log(data)
  })
  }

  return(
    <View style={styles.logincontainer}>
      <Text>Email</Text>
      <TextInput 
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        />

      <Text>Password</Text>
      <TextInput 
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        />

      <Button title={"Log in"} onPress={signInUser}/>
    </View>
    
  )
}

export const SignUp = () => {
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")

  const signUpUser = () => {
    
    createUserWithEmailAndPassword(auth,email,password ).then((data)=>{
      setDoc(doc(db,"users",data.user.uid),
      {
        email: data.user.email,
        todos: []
      }
      ).then((data)=>console.log(data))
    })

  }

  return(
    <View style={styles.logincontainer}>
      <Text>Email</Text>
      <TextInput style={styles.input} onChangeText={setEmail}/>

      <Text>Password</Text>
      <TextInput style={styles.input} onChangeText={setPassword}/>

      <Button title={"Sign up"} onPress={signUpUser}/>
    </View>
    
  )
}