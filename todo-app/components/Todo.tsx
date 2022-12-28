import { View, Text } from "react-native"
import { Todo as TodoModel} from "../types/TodoTypes"

export const Todo = (props: TodoModel) => {
  
  return(
    <View>
      <Text>{props.todo} ({props.dueDate})</Text>
    </View>
  )
}