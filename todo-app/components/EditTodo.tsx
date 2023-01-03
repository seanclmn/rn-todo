import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Animated, View, Button, Text,StyleSheet, ScrollView, TextInput, NativeSyntheticEvent, TextInputChangeEventData } from "react-native"
import { useTodoStore } from "../store/Store";
import { Todo } from "../types/Types";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid'
import { addDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../Firebase";

interface Inputs {
  todo: string,
  dueDate: string,
};

export const CreateTodo = () => {
  const storeState = useTodoStore((state)=>state)
  const createTodo = useTodoStore((state)=>state.addTodo)
  const setCreateMode = useTodoStore((state)=>state.setCreateMode)
  const progress = useRef(new Animated.Value(0.5)).current

  const addTodo = async (newTodo: Todo) => {
    const docRef = doc(db,`users/${storeState.user?.id}`)
    const newTodos = [...storeState.todos,newTodo]
    updateDoc(docRef,{todos: newTodos})
    storeState.setTodos(newTodos)
  }

  useEffect(()=> {
    Animated.timing(progress, {toValue: 1,useNativeDriver: true}).start()
  },[])

  const styles = StyleSheet.create({
    container: {
      display: "flex",
      width: "100%",
      padding: 15,
      margin: 15,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
			borderStyle: "solid",
			borderColor: "grey",
			borderWidth: 1,
      animation: `fadeIn 1s`
    },
    input: {
      height: 40,
      width: 300,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
  });

  const [todo,setTodo]=useState("")
  const [dueDate,setDueDate]=useState("")

  const newTodo: Todo = {
    todo: todo,
    dueDate: dueDate,
    completed: false,
    id: uuidv4()
  }

  console.log(newTodo)
  return(
    <Animated.View style={styles.container}>

      <Text>New Todo</Text>
      <TextInput 
        style={styles.input}
        value={todo} 
        onChangeText={(val)=>setTodo(val)}  
      />

      <Text>Due Date</Text>
      <TextInput 
        style={styles.input}
        value={dueDate}
        onChangeText={(val)=>setDueDate(val)}  
      />
      
      <Button 
        title="Add Task" 
        onPress={()=>{
          addTodo(newTodo)
          // useCreateTodo(newTodo)
          setCreateMode(false)
          }}
        />
    </Animated.View> 
  )

}
