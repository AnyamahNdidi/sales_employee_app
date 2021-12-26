import { Input } from '@mui/material'
import React, {useContext} from 'react'
import styled from "styled-components"
import {AppContext} from "../Global"
import {AddIcon, RemoveIcon } from '@mui/icons-material/Add';
import { FcAddRow,FcMinus } from 'react-icons/fc';
import {app} from "../../base"
import firebase from "firebase"
import {Link} from "react-router-dom"
// import RemoveIcon from '@mui/icons-material/Remove';

function Workspace() {
  const {data} = useContext(AppContext)
  const {current} = useContext(AppContext)
  const [toggle, setToggle] = React.useState(false)
  const [team, setTeam] = React.useState([{staff: ""}])
  const [name, setName] = React.useState("")
  const [space, setspace] = React.useState([])

  const addTeam = ()=>{
    setTeam([...team, {staff:""}])
  }

  const handleToggle = ()=>{
    setToggle(!toggle)
  }

  const removeTeam = (i, e)=>{
   const values = [...team];
   values.splice(i,1);
   setTeam(values)
  }

  const onChangeStaff = (i, e)=>{
    const values = [...team]
    values[i][e.target.name] = e.target.value
    setTeam(values) 
  }

  const createWorkSpace = async () =>{
    await app.firestore().collection("workstation").doc().set({
      name, 
      team,
      createdBy: current.uid,
      createdAt : firebase.firestore.FieldValue.serverTimestamp(),

    });
  }

  const ViewStation =async ()=>{
    await app
    .firestore()
    .collection("workstation")
    .onSnapshot((snapshot)=>{
    const r = []
    snapshot.forEach((doc)=>{
      r.push({...doc.data(), id:doc.id})
    });
    setspace(r)
    console.log("space: ",space)
    
    })
  }
  React.useEffect(()=>{
     ViewStation()
     
  },[])


  return (
   <Container>
     <Wrapper>
      <Header>Welcome Back, 

        {data && data.name}
        </Header>
        <Title  >you have <strong>{space.length}</strong> work station</Title>
        <ConAll>
        <CreateCon  onClick={()=>{
          handleToggle()
        }} >
          Create Work Space
        </CreateCon>
        </ConAll>

       
          {
            toggle ?  
            
            <ConAll>
            <ConIput placeholder="enter your workspace" 
            value ={name}
            onChange={(e)=>{
              setName(e.target.value)
            }}
            
            />
         <div>
           { 
            team.map((props, i)=>(
              <div>               
          <Dicon onClick={()=>{addTeam()}}/>
          <span>
            { 
            team.length > 1 ? <Dicon2 onClick={removeTeam}/>: null
            }
          </span>
           <ConInput2 placeholder="enter team member"
           value={props.staff}
           name="staff"
           onChange={(e)=>{
            onChangeStaff(i,e)
           }}
           />
                </div>
            ))
           }
         </div>
            </ConAll>
            
            : null
          }

    <ConAll>
    <ConCreate
    onClick={()=>{
      createWorkSpace()
      console.log(name, team);
    }}
    >
      create
      </ConCreate>  


      </ConAll> 
      <br/>
      <br/>
      <ConAll2>
       {
  space?.map((props)=>(
           <div key={props.id}> 
             {
               current.uid === props.createdBy ? (
                <Card>
                <NameCon>{props.name}</NameCon>
      
                <ButtonConc to = {`/project/${props.id}`}>explior work space</ButtonConc>
      
              </Card>
               ) : null
             }
              
             </div>
        
         ))
       }
           
       
      
      </ConAll2>

     </Wrapper>
   </Container>
  )
}

export default Workspace

const ConAll2 = styled.div`
font-size: 15px;
font-weight: bold;
width: 100%;
height: auto;

display: flex;
justify-content:center;
align-items: center;
`

const NameCon = styled.div``
const ButtonConc = styled(Link)`
width: 150px;
height: 50px;
background-color: #2ab7ca;
color:white;
display: flex;
justify-content:center;
align-items: center;
margin-top: 10px;
cursor: pointer;
text-decoration: none;
transition: all 350ms;
transform: scale(1.0);


:hover{
  transform: scale(0.9);
  cursor:pointer;
}
`


const Card = styled.div`
display: flex;
justify-content:center;
align-items: center;
width: 200px;
flex-direction: column;
height:150px;
margin-right: 30px;
box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
`

const ConCreate = styled.div`
width: 200px;
height: 50px;
color: white;
background-color:#2ab7ca;
margin-top: 10px;
display: flex;
justify-content:center;
align-items: center;
border-radius: 5px;
cursor: pointer;
`

const ConInput2 = styled.input`
height: 30px;
`

const Dicon = styled(FcAddRow)`
font-size: 30px;
cursor: pointer;
`
const Dicon2 = styled(FcMinus)`
font-size: 30px;
cursor: pointer;
`

const ConAll = styled.div`
font-size: 15px;
font-weight: bold;
width: 100%;
height: auto;

display: flex;
justify-content:center;
align-items: center;
flex-direction: column;
`

const ConIput = styled.input`

height: 40px;
width: 250px;

`

const CreateCon = styled.div`
width: 200px;
height: 50px;
background-color: #2ab7ca;
color: white;
display: flex;
justify-content:center;
align-items: center;
border-radius: 5px;
font-weight: bold;
cursor: pointer;
margin-bottom: 20px;

`


const Title = styled.div`
font-size: 15px;
font-weight: bold;
width: 100%;
height: 50px;

display: flex;
justify-content:center;
align-items: center;

`
const Header = styled.div`
font-size: 15px;
font-weight: bold;
width: 100%;
height: 50px;

display: flex;
justify-content:center;
align-items: center;
`


const Container = styled.div`
width: 100%;
height: 100%;
min-height: calc(100vh - 100px);
display: flex;
justify-content:center;
`
const Wrapper = styled.div`
margin-top: 50px;
`

