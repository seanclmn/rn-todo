import { ChangeEvent, useEffect, useState } from "react";
import { View, Button, Text,StyleSheet, ScrollView, TextInput, NativeSyntheticEvent, TextInputChangeEventData } from "react-native"
import { useTodoStore } from "../store/Store";
import { Todo } from "../types/TodoTypes";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid'



interface Inputs {
  todo: string,
  dueDate: string,
};

export const CreateTodo = () => {
  const createTodo = useTodoStore((state)=>state.addTodo)
  const setCreateMode = useTodoStore((state)=>state.setCreateMode)
  const styles = StyleSheet.create({
    container: {
      display: "flex",
      width: "auto",
      padding: 15,
      margin: 15,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      border: "1px solid grey",
      borderRadius: 15
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
    <View style={styles.container}>

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
        title="Submit" 
        onPress={()=>{
          createTodo(newTodo)
          setCreateMode(false)
          }}
        />
    </View> 
  )

}