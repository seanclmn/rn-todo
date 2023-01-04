import { StyleSheet, View, Text, Button, Pressable } from "react-native"
import CheckBox from 'expo-checkbox'
import { Todo as TodoModel} from "../types/Types"
import { useState } from "react"
import { doc, updateDoc } from "firebase/firestore"
import { db } from "../Firebase"
import { useTodoStore } from "../store/Store"
import Icon from 'react-native-vector-icons/AntDesign';

export const Todo = (todoProps: TodoModel) => {
  const storeState = useTodoStore((state)=>state)
  const [completed,setCompleted]=useState(todoProps.completed)

  const changeTodoStatus = () => {

    const newStatus = !completed
    const docRef = doc(db,`users/${storeState.user?.id}`)

    const newTodos = storeState.todos.map((todo)=>{
      if(todo.id===todoProps.id){
        return({...todo,completed:newStatus})
      }else{
        return(todo)
      }
    })
    updateDoc(docRef,{todos: newTodos})
    setCompleted(newStatus)
    console.log(newStatus)
    storeState.setTodos(newTodos)
  }

  const deleteTodo = () => {
    const docRef = doc(db,`users/${storeState.user?.id}`)
    const newTodos = storeState.todos.filter((todo)=>(todo.id!==todoProps.id))
    updateDoc(docRef,{todos: newTodos})
    storeState.setTodos(newTodos)
  }

  const updateTodo = () => {


  }

  const Styles = StyleSheet.create({
    todoTop: {
      height: 50,
      width: "100%",
      display: "flex",
      flexDirection: "row",
      padding: 15,
      paddingHorizontal: 20,
      marginTop: 15,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderStyle: "solid",
			borderColor: "#c9c9c9",
			borderTopWidth: 1,
      borderBottomWidth: 1
    },
    dueDate: {
      fontSize: 10
    }
  })

  return(
    <View style={Styles.todoTop}>
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
          style={Styles.dueDate}
          >
          (Due {todoProps.dueDate})
        </Text>
      </View>

      
      <Pressable onPress={deleteTodo}>
        <Icon 
          style={{fontSize: 20,color: "#e80909"}}
          name='delete'
        />
      </Pressable>
    </View>
  )
}