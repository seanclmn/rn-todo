import create from 'zustand'
import { Todo,AppState } from '../types/Types'

export const useTodoStore = create<AppState>((set)=> ({
  loggedIn: false,
  user: null,
  todos: [],
  createMode: false,  
  setLogIn: (bool)=>set(()=>({loggedIn: bool})),
  setUser: (newUser)=>set(()=>({user: newUser})),
  setTodos: (loadedTodos)=>set(()=>({todos: loadedTodos})),
  addTodo: (newTodo)=>{
		set((state)=>({todos: [...state.todos,newTodo]}))
	},
	deleteTodo: (todoToDelete)=>set((state)=>({todos: state.todos.filter((todo)=>todo.id !== todoToDelete.id)})),
  updateTodo: (todoToUpdate)=>{
    set((state)=> ({
      todos: state.todos.map((todo)=>{
        if(todo.id===todoToUpdate.id){
          return todoToUpdate
        }else{
          return todo
        }
      })

    }))
  },
  setCreateMode: (bool)=>set({createMode:bool})
}))
