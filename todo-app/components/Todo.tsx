import { View, Text, Pressable } from "react-native"
import CheckBox from 'expo-checkbox'
import { Todo as TodoModel} from "../types/Types"
import { useState } from "react"
import { doc, updateDoc } from "firebase/firestore"
import { db } from "../Firebase"
import { useTodoStore } from "../store/Store"
import Icon from 'react-native-vector-icons/AntDesign';
import { appStyles } from "../styles/Styles"

export const Todo = (todoProps: TodoModel) => {
  const storeState = useTodoStore((state)=>state)
  const [completed,setCompleted]=useState(todoProps.completed)

  const changeTodoStatus = async () => {
    const newStatus = !completed
    const docRef = doc(db,`users/${storeState.user?.id}`)
    const newTodos = storeState.todos.map((todo)=>{
      if(todo.id===todoProps.id){
        return({...todo,completed:newStatus})
      }else{
        return(todo)
      }
    })
    await updateDoc(docRef,{todos: newTodos})
    setCompleted(newStatus)
    storeState.setTodos(newTodos)
  }

  const deleteTodo =async () => {
    const docRef = doc(db,`users/${storeState.user?.id}`)
    const newTodos = storeState.todos.filter((todo)=>(todo.id!==todoProps.id))
    await updateDoc(docRef,{todos: newTodos})
    storeState.setTodos(newTodos)
  }

  return(
    <View style={appStyles.todoContainer}>
      <CheckBox 
        disabled={false} 
        value={completed} 
        onValueChange={changeTodoStatus}
        style={{height: 20,width: 20}}
        color={"rgb(33, 150, 243)"}
      />

      <View style={{flexGrow: 1, marginHorizontal: 10}}>
        <Text 
          style={completed && {textDecorationLine: 'line-through', textDecorationStyle: 'solid'}}
          >
          {todoProps.todo}
        </Text>

        <Text 
          style={{fontSize:10}}
          >
          (Due {todoProps.dueDate})
        </Text>
      </View>
      
      <Pressable 
        onPress={deleteTodo}
        >
        <Icon 
          style={{fontSize: 20,color: "#e80909"}}
          name='delete'
        />
      </Pressable>
    </View>
  )
}