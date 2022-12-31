import { Button, StyleSheet, Text, View } from 'react-native';
import { useTodoStore } from './store/Store';

import { Todo } from './components/Todo';
import { CreateTodo } from './components/CreateTodo';
import { LogIn } from './components/Creds';

const App = () => {
  const storeState = useTodoStore(state=>state)
  const open = useTodoStore((state)=>state.createMode)
  const todos = useTodoStore((state)=>state.todos)
  const setCreateMode = useTodoStore((state)=>state.setCreateMode)
	console.log(todos)

  // if(!storeState.loggedIn) return <LogIn/>
  return (
    <View style={styles.appContainer}>
      {open ? <CreateTodo/>: <Button title="create" onPress={()=>setCreateMode(true)}/>}
      <Text>Your Todos:</Text>
      <View style={styles.todosContainer}>
        {todos.map((todo)=><Todo {...todo} key={todo.id}/>)}
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
