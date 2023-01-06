import {View,Text} from 'react-native'

type ErrorMessageProps = {
  message:string|undefined
}

export const ErrorMessage = ({message}:ErrorMessageProps) =>{
  
  return(
    <View>
      {message!==undefined && <Text style={{color: "red",marginVertical: 5,textAlign: "center",width:"100%",maxWidth:300}}>{message}</Text>}
    </View>
  )
}