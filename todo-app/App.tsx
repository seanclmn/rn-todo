import { Button, StyleSheet, Text, View } from 'react-native';
import { useTodoStore } from './store/Store';

import { Todo } from './components/Todo';
import { CreateTodo } from './components/CreateTodo';
import { LogIn, SignUp } from './components/Creds';
import { useEffect, useState } from 'react';
import {auth, db} from './Firebase'
import { collection, doc, getDoc } from 'firebase/firestore';

const App = () => {
  const [loading,setLoading]=useState(true)
  const storeState = useTodoStore(state=>state)

  useEffect(()=>{

    const user = auth.onAuthStateChanged(async (user)=>{
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
          storeState.setLogIn(true)
        }
      }
      setLoading(false)

      
    })

    return user

  },[])

  if(loading) return <View style={styles.appContainer}><Text>Loading...</Text></View>

  if(!storeState.loggedIn) return <SignUp/>

  return (
    <View style={styles.appContainer}>
      {storeState.createMode ? <CreateTodo/>: <Button title="create" onPress={()=>storeState.setCreateMode(true)}/>}
      <Text>Your Todos:</Text>
      <View style={styles.todosContainer}>
        {storeState.todos.map((todo)=><Todo {...todo} key={todo.id}/>)}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    marginTop: 50,
    width: "100%",
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  todosContainer: {
    width: "100%",
    flexDirection: "column"
  }
});


export default App
