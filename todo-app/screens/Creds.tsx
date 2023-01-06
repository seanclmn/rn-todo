import { View, Text, TextInput, Pressable } from "react-native"
import { Button } from "../components/Button";
import {useState} from 'react'
import { auth, db } from "../Firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import { NavigationProp,ParamListBase } from "@react-navigation/native";

// Components
import { ErrorMessage } from "../components/Errormessage";

// Styles
import { appStyles } from "../styles/Styles";

interface CredsFormData {
  email: string
  password: string
}

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
}).required();

interface LoginProps {
  navigation: NavigationProp<ParamListBase>
}

export const LogIn = ({navigation}:LoginProps) => {
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
    <View style={appStyles.appContainer}>
      <View style={appStyles.credsContainer}>
        <Text>Email</Text>
        <Controller
          control={control}
          rules={{required: true}}
          render={({ field: { onChange, onBlur, value } })=>(
            <TextInput 
              style={appStyles.input}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              />
          )}
          name="email"
          />
        <ErrorMessage message={errors.email?.message}/>
  
        <Text>Password</Text>
        <Controller
          control={control}
          rules={{required: true}}
          render={({ field: { onChange, onBlur, value } })=>(
            <TextInput 
              style={appStyles.input}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
          name="password"
        />
        <ErrorMessage message={errors.password?.message}/>
  
        <Button title={"Log in"} onClick={handleSubmit(signInUser)}/>

        {invalidCreds && <ErrorMessage message={`Sorry, your Credentials were incorrect. Please double-check your email & password.`}/>}

  			<Pressable style={{marginTop: 35}} onPress={()=>navigation.navigate('Signup')} >
  				<Text style={{textDecorationLine:"underline",color:"rgb(33, 150, 243)"}}>Don't have an account? Sign up here.</Text>
  			</Pressable>
  		</View>
    </View>
  )
}

export const SignUp = () => {

  const [emailUsed,setEmailUsed]=useState(false)
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const signUpUser = async ({email,password}:CredsFormData) => {
    console.log(email,password)
    try{
      const data  = await createUserWithEmailAndPassword(auth,email,password)
      await setDoc(doc(db,"users",data.user.uid),
        {
          email: data.user.email,
          todos: []
        }
      )
    }catch(error){
      console.log("Could not sign up user",error)
      setEmailUsed(true)
    }
  }

  return(
    <View style={appStyles.appContainer}>
      <View style={appStyles.credsContainer}>
        <Text>Email</Text>
        <Controller
          control={control}
          rules={{required: true}}
          render={({ field: { onChange, onBlur, value } })=>(
            <TextInput 
              style={appStyles.input}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              />
          )}
          name="email"
          />
        <ErrorMessage message={errors.email?.message}/>
  
        <Text>Password</Text>
        <Controller
          control={control}
          rules={{required: true}}
          render={({ field: { onChange, onBlur, value } })=>(
            <TextInput 
              style={appStyles.input}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
          name="password"
        />
        <ErrorMessage message={errors.password?.message}/>

        <Button title={"Sign up"} onClick={handleSubmit(signUpUser)}/>
        {emailUsed && <ErrorMessage message={`Sorry, that email is already being used. Please use a different email.`}/>}
  	  </View>  
    </View>
  )
}
