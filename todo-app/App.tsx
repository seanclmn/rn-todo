import { ActivityIndicator, Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useTodoStore } from './store/Store';

import { Todo } from './components/Todo';
import { CreateTodo } from './components/EditTodo';
import { LogIn, SignUp } from './screens/Creds';
import { useEffect, useState } from 'react';
import {auth, db} from './Firebase'
import { collection, doc, getDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from './screens/Home';

const App = () => {
  const [loading,setLoading]=useState(true)
  const storeState = useTodoStore(state=>state)

  const Stack = createNativeStackNavigator()

  useEffect(()=>{
    const user = auth.onAuthStateChanged(async (user)=>{
      setLoading(true)
      if(user) {
        const usersRef = collection(db, "users")
        const result = (await getDoc(doc(usersRef,user?.uid))).data()
        if(result) {
          storeState.setUser(
            {
              id: user.uid,
              email: result.email,
              todos: result.todos
            }
          )
          storeState.setTodos(result.todos)
          storeState.setLogIn(true)
        }
      }else{
        storeState.setLogIn(false)
      }
      setLoading(false)

      
    })

    return user

  },[])

  if(loading) return( 
    <View style={styles.appContainer}>
      <ActivityIndicator style={{marginVertical: "auto"}} size="large" color="rgb(33, 150, 243)" />
    </View>
    )

  if(!storeState.loggedIn) return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={"Login"} component={LogIn}/>
        <Stack.Screen name={"Signup"} component={SignUp}/>
      </Stack.Navigator>
    </NavigationContainer>
  )

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={"Home"} component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  todosContainer: {
    width: "100%",
    flexDirection: "column"
  },
  navBar: {
    width:"100%",
    display:"flex",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginBottom: 20
  }
});


export default App
