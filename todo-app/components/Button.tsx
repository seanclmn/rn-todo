import {Button as RNbutton} from '@rneui/themed'

interface ButtonProps {
  title: string
  onClick: ()=>void
}

export const Button = ({title,onClick}:ButtonProps) => {

  return(
    <RNbutton 
      title={title} 
      onPress={onClick} 
      color={"rgb(33, 150, 243)"}
      titleStyle={{fontSize:15}}
      buttonStyle={{borderRadius:5}}
      />
  )
}