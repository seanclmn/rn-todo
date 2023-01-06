import { useEffect, useRef, useState } from "react";
import { useTodoStore } from "../store/Store";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid'
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../Firebase";
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup";
// Components
import { Todo } from "../types/Types";
import Icon from 'react-native-vector-icons/AntDesign';
import { View, TextInput, Pressable } from "react-native"
import {Button} from '../components/Button'
import { Controller, useForm } from "react-hook-form";
// Styles
import { appStyles } from "../styles/Styles";
import { ErrorMessage } from "./Errormessage";

const schema = yup.object({
  todo: yup.string().required('This is a required field'),
  dueDate: yup.string().required('This is a required field').matches(/^((((0[13578])|([13578])|(1[02]))[\/](([1-9])|([0-2][0-9])|(3[01])))|(((0[469])|([469])|(11))[\/](([1-9])|([0-2][0-9])|(30)))|((2|02)[\/](([1-9])|([0-2][0-9]))))[\/]\d{4}$|^\d{4}$/,'Date must be in mm/dd/yyyy format')
})

interface TodoInputs {
  todo: string,
  dueDate: string,
};

export const CreateTodo = () => {
  const storeState = useTodoStore((state)=>state)
  const createTodo = useTodoStore((state)=>state.addTodo)
  const setCreateMode = useTodoStore((state)=>state.setCreateMode)
  const { control, handleSubmit, formState: { errors } } = useForm<TodoInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      todo: '',
      dueDate: ''
    }
  });

  const addTodo = async ({todo,dueDate}: TodoInputs) => {

    const newTodo: Todo = {
      todo: todo,
      dueDate: dueDate,
      completed: false,
      id: uuidv4()
    }

    console.log(newTodo)

    try{
      
      const docRef = doc(db,`users/${storeState.user?.id}`)
      const newTodos = [...storeState.todos,newTodo]
      await updateDoc(docRef,{todos: newTodos})
      storeState.setTodos(newTodos)
      setCreateMode(false)
    }catch(error){
      console.log(error)
    }
  }

  return(
    <View style={appStyles.editTodoContainer}>
      <View style={{width:"100%"}}>
        <Pressable style={{marginLeft:"auto"}} onPress={()=>storeState.setCreateMode(false)}>
          <Icon name="closesquareo" style={{fontSize:20,color:"#e80909"}}/>
        </Pressable>
      </View>

      <Controller
        control={control}
        rules={{required: true}}
        render={({ field: { onChange, onBlur, value } })=>(
          <TextInput 
            placeholderTextColor={"grey"}
            placeholder="New todo"
            style={appStyles.input}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            />
        )}
        name="todo"
      />

      <ErrorMessage message={errors.todo?.message}/>

      <Controller
        control={control}
        rules={{required: true}}
        render={({ field: { onChange, onBlur, value } })=>(
          <TextInput 
            placeholderTextColor={"grey"}
            placeholder="Due date"
            style={appStyles.input}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            />
        )}
        name="dueDate"
      />

      <ErrorMessage message={errors.dueDate?.message}/>
      
      <Button 
        title="Add Task" 
        onClick={handleSubmit(addTodo)}
        />
    </View> 
  )

}
