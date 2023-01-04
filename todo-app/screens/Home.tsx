import { signOut } from 'firebase/auth';
import {View,ScrollView,Button,Text,StyleSheet} from 'react-native'
import { auth } from '../Firebase';
import { useTodoStore } from '../store/Store';

import { CreateTodo } from '../components/EditTodo'
import { Todo } from '../components/Todo'


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

export const Home = () => {
  const storeState = useTodoStore((state)=>state)


  const logOut = () => {
    signOut(auth).then(() => {
      console.log("Signed in user")
    }).catch((error) => {
      console.log("Could not sign in user")
  });
  }

  return(
    <View style={styles.appContainer}>
      <View style={styles.navBar}>
        <Button 
          title={"Log Out"} onPress={logOut}
          />
      </View>

      {storeState.createMode ? <CreateTodo/>: <Button title="create" onPress={()=>storeState.setCreateMode(true)}/>}
      <Text>Your Todos:</Text>
      <ScrollView style={styles.todosContainer}>
        {storeState.todos.map((todo)=><Todo {...todo} key={todo.id}/>)}
      </ScrollView>
    </View>
  )
}