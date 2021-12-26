import react, {createContext, useState, useEffect} from "react"
import { parseISO, format,formatISO } from 'date-fns';
import {app} from "../base"

export const AppContext = createContext()
const db = app.firestore().collection("users")

export const AppProvider = ({children})=>{
 
  const [current, setCurrentUser] = useState(null)
  const [data, setData] = useState(null)

  const [currentID, setCurentID] = useState(0)
  const [file, setFile] = useState(null)
  const [todo, setTodo] = useState({
    fullName:"",
    email:"",
    address:"",
    department:"",
    dob:new Date,
    active:""

  })
  const [changeButton, setChangeButton] = useState(true)

  useEffect(()=>{
    app.auth().onAuthStateChanged((user)=>{
      setCurrentUser(user);

      db.doc(user.uid).get().then((doc)=>{
        setData(doc.data())
      })
    })

  },[])
 


  return(
    <AppContext.Provider value={{
      todo, setTodo, currentID, setCurentID, changeButton, setChangeButton,
       file, setFile,current,setCurrentUser, data, setData
    }} >
      {children}
    </AppContext.Provider>
  )
}