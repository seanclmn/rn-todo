import { StyleSheet,Platform } from "react-native"

export const appStyles = StyleSheet.create({
  appContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  todosContainer: {
    width: "100%",
    flexDirection: "column"
  },
  todoContainer: {
    height: 50,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    padding: 15,
    paddingHorizontal: 20,
    marginTop: 15,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderStyle: "solid",
    borderColor: "#c9c9c9",
    borderTopWidth: 1,
    borderBottomWidth: 1
  },
  editTodoContainer: {
    display: "flex",
    width: "100%",
    padding: 15,
    margin: 15,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: "solid",
    borderColor: "#c9c9c9",
    borderBottomWidth: 1,
    borderTopWidth: 1,
  },
  credsContainer: {
    marginTop: "auto",
    marginBottom: "auto",
    width: "100%",
    display: 'flex',
    flexDirection: 'column',
    alignItems: "center",
    backgroundColor: "#fff"
  },
  input: {
    height: 40,
    width: "100%",
    maxWidth: 300,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  navBar: {
    width:"100%",
    display:"flex",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    padding: 20,
  },
  noTodosMessage: {
    marginLeft:"auto",
    marginRight:"auto",
    textAlign: "center",
    maxWidth:300,
    marginTop: 50
  }
})