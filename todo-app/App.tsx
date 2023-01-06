import { ActivityIndicator, View } from 'react-native';
import { useTodoStore } from './store/Store';
import { LogIn, SignUp } from './screens/Creds';
import { useEffect, useState } from 'react';
import {auth, db} from './Firebase'
import { collection, doc, getDoc } from 'firebase/firestore';
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from './screens/Home';
import { appStyles } from './styles/Styles';

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
        storeState.setTodos([])
      }
      setLoading(false)
    })

    return user

  },[])

  if(loading) return( 
    <View style={appStyles.appContainer}>
      <ActivityIndicator 
        style={{marginTop: "auto",marginBottom:"auto"}} 
        size="large" 
        color="rgb(33, 150, 243)" 
      />
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

export default App
