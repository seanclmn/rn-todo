import { ActivityIndicator, Button, StyleSheet, Text, View } from 'react-native';
import { useTodoStore } from './store/Store';

import { Todo } from './components/Todo';
import { CreateTodo } from './components/EditTodo';
import { LogIn, SignUp } from './components/Creds';
import { useEffect, useState } from 'react';
import {auth, db} from './Firebase'
import { collection, doc, getDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';

const App = () => {
  const [loading,setLoading]=useState(true)
  const storeState = useTodoStore(state=>state)

  const logOut = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
});
  }

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

  if(loading) return <View style={styles.appContainer}><ActivityIndicator size="large" color="#0000ff" /></View>

  if(!storeState.loggedIn) return <LogIn/>

  return (
    <View style={styles.appContainer}>
      <View style={styles.navBar}>
        <Button 
          title={"Log Out"} onPress={logOut}
          />
      </View>

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
  },
  navBar: {
    width:"100%",
    display:"flex",
    justifyContent: "flex-end",
    alignItems: "flex-end"
  }
});


export default App
