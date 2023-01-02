export interface Todo {
  todo: string
  dueDate:string
  completed: boolean
  id: string
}

export interface User {
  email: string
  id: string
  todos: Todo[]
}

export interface AppState {
  loggedIn: boolean
  user: User | null
  todos: Todo[]
  createMode: boolean
  setLogIn: (bool: boolean)=>void
  setUser: (newUser: User | null)=>void
  addTodo: (newTodo: Todo)=>void
  deleteTodo: (todoToDelete: Todo)=>void
  updateTodo: (todoToUpdate: Todo)=>void
  setCreateMode: (bool: boolean)=>void
}