import React from 'react'
import styled from "styled-components"
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import TextField from '@mui/material/TextField';
import {makeStyles} from "@mui/styles"
import { borderBottom } from '@mui/system';
import { InputBase } from '@mui/material';
import DatePicker from "react-datepicker"
import moment from "moment"
import "react-datepicker/dist/react-datepicker.css"
import {creatEm} from "./functions/index"

const useStyles = makeStyles({

  filed:{
    border:"none",
    outline: "none",
    height: "500px"
  }

})

function Addfile() {
  const classes = useStyles()
  const [todo, setTodo] = React.useState({
    fullName:"",
    email:"",
    address:"",
    department:"",
    dob:"",
    active:""

  })
  const postEm = async ()=>{
    
    const result = await creatEm(todo)
    console.log(result)

  }
  return (
  <Container>
    <Wrapper>
      <InputCon>
      <HeadCon>
        <Box1></Box1>
        <Box2></Box2>
        <Box3></Box3>
        <Box4></Box4>
      </HeadCon>
      
      <AllInput>
        <ConLabel>Full Name</ConLabel>
        <ConInput
        value={todo.fullName}
        onChange={
        e => setTodo({...todo, fullName: e.target.value})
        }
        
        ></ConInput>
        <ConLabel>E-mail</ConLabel>
        <ConInput
        value={todo.email}
        onChange={
          e => setTodo({...todo, email: e.target.value})
        }
        ></ConInput>
        <ConLabel>Address</ConLabel>
        <ConInput
        value={todo.address}
        onChange={e=> setTodo({...todo, address: e.target.value})}
        ></ConInput>
        <ConLabel>DepartMent</ConLabel>
        <InputSelect
           value={todo.department}
           onChange={e=> setTodo({...todo, department: e.target.value})}
        >
          <InputOption value="Mangement">Mangement </InputOption>
          <InputOption value="operation Officer">Operation Officer</InputOption>
          <InputOption value="sales rep">Sales Rep</InputOption>
          </InputSelect>

          <ConLabel>Date Of Birth</ConLabel>
         <DateCon
         value={todo.dob}
                        selected={todo.dob}
                        onChange={
                          data => setTodo({...todo, dob:data})
                        }
         dateFormat='yyyy/MM/dd'
        minDate={moment().subtract(150, "years")._d}
                        maxDate={moment().subtract(20, "years")._d}
                        isClearable
                        showYearDropdown
                        scrollableYearDropdown={true}
                        yearDropdownItemNumber={100}
                        showMonthDropdown
                        scrollableMonthYearDropdown
                        placeholder="Date Of Birth"
         />
         <ConLabel>Active</ConLabel>
        <InputSelect 
        value={todo.active}
        onChange={
          e => setTodo({...todo, active: e.target.value})
        }
        >
          <InputOption value="true">true</InputOption>
          <InputOption value="false">false</InputOption>
          </InputSelect>
       
      </AllInput>
      <AllButton>
        <Button ck="#2AB7CA">Cancel</Button>
        <Button clr="#2AB7CA" ck="white" 
        onClick={()=>{
          postEm()
        }}
        >Add</Button>
      </AllButton>

      </InputCon>
    </Wrapper>
  </Container>
  )
}

export default Addfile

const DateCon = styled(DatePicker)`

width: 300px;
height: 45px;
border:0px;
background-color:lightgrey;
border-radius: 5px;
margin: none;
border-bottom: none;


`

const Button = styled.div`
color: ${({ck})=>ck};
height: 50px ;
width: 100px;
background-color:${({clr})=> clr} ;
display: flex;
justify-content:center ;
border: 1px solid #2AB7CA;
align-items: center;
border-radius: 5px;
margin-left: 10px;
cursor: pointer;
`

const AllButton = styled.div`
height: 90px;
width: 300px;

display: flex;
justify-content:flex-end;
align-items: center;
`


const InputOption = styled.option``
const InputSelect = styled.select`
outline: none;
border: none;
height: 50px;
border-radius: 5px;
background-color:lightgrey;
font-size: 20px;
color: grey;
width: 300px;
padding-right:15px;
padding-left: 5px;
margin-right: 25px;
`
const ConLabel = styled.label`
color: grey;
padding-bottom: 5px;
`
const ConInput = styled.input`
outline: none;
width: 300px;
height: 45px;
border: none;
background-color:lightgrey;
border-radius: 5px;
`
const AllInput = styled.div`
display: flex;
flex-direction: column;
padding-top: 20px;
`

const Box1 = styled.div`
width: 60px;
background-color:lightgrey;
height:50px ;
border-radius: 5px;
`
const Box2 = styled.div`
width: 60px;
background-color:lightgrey;
height:50px ;
border-radius: 5px;
`
const Box3 = styled.div`
width: 60px;
background-color:lightgrey;
height:50px ;
border-radius: 5px;
`
const Box4 = styled.div`
width: 60px;
background-color:lightgrey;
height:50px ;
border-radius: 5px;
`

const InputCon = styled.div`
display: flex;
flex-direction: column;
`
const HeadCon = styled.div`
height: 50px;
display: flex;
width: 300px;
justify-content:space-between;

`

const Container = styled.div``
const Wrapper = styled.div`
display: flex;
flex-direction: column;
padding-left: 20px;
padding-top: 50px;
`
