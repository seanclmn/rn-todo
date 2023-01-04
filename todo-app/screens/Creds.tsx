import { View, Text, TextInput, StyleSheet, Button } from "react-native"
import {useState} from 'react'
import { auth, db } from "../Firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { useForm, FormProvider, SubmitHandler, SubmitErrorHandler,Controller } from 'react-hook-form';
import { registerCustomIconType } from "@rneui/themed";
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';

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
  errorMessage: {
    color: "red",
    marginVertical: 5,
    textAlign: "center"
  }
});

interface CredsFormData {
  email: string
  password: string
}

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
}).required();

export const LogIn = () => {
  const [invalidCreds,setInvalidCreds]=useState(false)
  const { control, handleSubmit, formState: { errors } } = useForm<CredsFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const signInUser = async ({email,password}:CredsFormData) =>{
    try{ 
      await signInWithEmailAndPassword(auth,email,password)
      console.log("User signed in!")
    }catch(error){
      console.log(error)
      setInvalidCreds(true)
    }

  }
  

  return(
    <View style={styles.logincontainer}>
      <Text>Email</Text>
      <Controller
        control={control}
        rules={{required: true}}
        render={({ field: { onChange, onBlur, value } })=>(
          <TextInput 
            style={styles.input}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            />
        )}
        name="email"
        />
      <Text style={styles.errorMessage}>{errors.email?.message}</Text>

      <Text>Password</Text>
      <Controller
        control={control}
        rules={{required: true}}
        render={({ field: { onChange, onBlur, value } })=>(
          <TextInput 
            style={styles.input}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
          />
        )}
        name="password"
      />
      <Text style={styles.errorMessage}>{errors.password?.message}</Text>

      <Button title={"Log in"} onPress={handleSubmit(signInUser)}/>
      {/* <Button title={"Sign up"}/> */}
      {invalidCreds && <Text style={styles.errorMessage}>Sorry, your Credentials were incorrect.{"\n"}Please double-check your email & password.</Text>}
    </View>
    
  )
}

export const SignUp = () => {

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const signUpUser = ({email,password}:CredsFormData) => {
    
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
      <Controller
        control={control}
        rules={{required: true}}
        render={({ field: { onChange, onBlur, value } })=>(
          <TextInput 
            style={styles.input}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            />
        )}
        name="email"
        />
      <Text>{errors.email?.message} </Text>

      <Text>Password</Text>
      <Controller
        control={control}
        rules={{required: true}}
        render={({ field: { onChange, onBlur, value } })=>(
          <TextInput 
            style={styles.input}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
          />
        )}
        name="password"
      />

      <Button title={"Sign up"} onPress={handleSubmit(signUpUser)}/>
    </View>
    
  )
}