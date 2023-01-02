import { StyleSheet, View, Text } from "react-native"
import CheckBox from 'expo-checkbox'
import { Todo as TodoModel} from "../types/Types"
import { useState } from "react"

export const Todo = (props: TodoModel) => {

  const [state,setState]=useState(false)

  const Styles = StyleSheet.create({
    todo: {
      height: 50,
      width: "100%",
      display: "flex",
      flexDirection: "row",
      padding: 15,
      paddingHorizontal: 40,
      marginTop: 15,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'space-between',
			borderStyle: "solid",
			borderColor: "grey",
			borderWidth: 1
  },
  })
  console.log(state)
  return(
    <View style={Styles.todo}>
      <CheckBox disabled={false} value={state} onValueChange={setState}/>
      <Text>{props.todo} (Due {props.dueDate})</Text>
    </View>
  )
}