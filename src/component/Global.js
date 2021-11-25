import react, {createContext, useState, useEffect} from "react"
import { parseISO, format,formatISO } from 'date-fns';

export const AppContext = createContext()

export const AppProvider = ({children})=>{

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
 


  return(
    <AppContext.Provider value={{
      todo, setTodo, currentID, setCurentID, changeButton, setChangeButton, file, setFile
    }} >
      {children}
    </AppContext.Provider>
  )
}