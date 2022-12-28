export interface Todo {
  todo: string
  dueDate:string
  completed: boolean
  id: string
}

export interface AppState {
  todos: Todo[]
  createMode: boolean
  addTodo: (newTodo: Todo)=>void
  deleteTodo: (todoToDelete: Todo)=>void
  updateTodo: (todoToUpdate: Todo)=>void
  setCreateMode: (bool: boolean)=>void
}