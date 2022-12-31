import { View, Text, TextInput, StyleSheet, Button } from "react-native"

const styles = StyleSheet.create({
  logincontainer: {
    marginTop: "auto",
    marginBottom: "auto",
    width: "100%",
    display: 'flex',
    flexDirection: 'column',
    alignItems: "center"
  },
  input: {
    height: 40,
    width: 300,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export const LogIn = () => {

  return(
    <View style={styles.logincontainer}>
      <Text>Username</Text>
      <TextInput style={styles.input}/>

      <Text>Password</Text>
      <TextInput style={styles.input}/>

      <Button title={"Log in"}/>
      {/* <Button title={"Sign up"}/> */}
    </View>
    
  )
}

export const SignUp = () => {

  return(
    <View style={styles.logincontainer}>
      <Text>Username</Text>
      <TextInput style={styles.input}/>

      <Text>Password</Text>
      <TextInput style={styles.input}/>

      <Button title={"Sign up"}/>
      {/* <Button title={"Log in"}/> */}
    </View>
    
  )
}