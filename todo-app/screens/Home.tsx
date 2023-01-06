import { signOut } from 'firebase/auth';
import {View,ScrollView,Text} from 'react-native'
import {Button} from '../components/Button'
import { auth } from '../Firebase';
import { useTodoStore } from '../store/Store';
import { CreateTodo } from '../components/EditTodo'
import { Todo } from '../components/Todo'
import { appStyles } from '../styles/Styles';

export const Home = () => {
  const storeState = useTodoStore((state)=>state)
  const logOut = async () => {
		try{
			await signOut(auth)
		}catch(error){
			console.log("Could not sign out user",error)
		}
  }

  return(
    <View style={appStyles.appContainer}>
      <View style={appStyles.navBar}>
        <Button 
          title={"Log Out"} 
					onClick={logOut}
					/>
      </View>

			{storeState.createMode ? <CreateTodo/>: <Button title="new todo" onClick={()=>storeState.setCreateMode(true)}/>}
			<Text style={{fontSize:17,fontWeight:"400", marginTop: 20}}>Your Todos:</Text>
      <ScrollView style={appStyles.todosContainer}>
        {storeState.todos.length>0 ? 
          storeState.todos.map((todo)=><Todo {...todo} key={todo.id}/>) : 
          <Text style={appStyles.noTodosMessage}>
            You currently have no todos. Tap on "new todo" to start adding tasks
          </Text>
        }
      </ScrollView>
    </View>
  )
}
