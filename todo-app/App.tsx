import { Button, StyleSheet, Text, View } from 'react-native';
import { useTodoStore } from './store/Store';

import { Todo } from './components/Todo';
import { CreateTodo } from './components/CreateTodo';

const App = () => {

  const open = useTodoStore((state)=>state.createMode)
  const todos = useTodoStore((state)=>state.todos)
  const setCreateMode = useTodoStore((state)=>state.setCreateMode)

  return (
    <View style={styles.container}>
      <Text>test</Text>
      {open ? <CreateTodo/>: <Button title="create" onPress={()=>setCreateMode(true)}/>}
      
      <View>
        <Text>Your Todos:</Text>
        {todos.map((todo)=><Todo {...todo} key={todo.id}/>)}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default App