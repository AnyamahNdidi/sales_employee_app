import React,{useContext, useState, useEffect} from 'react'
import styled from "styled-components"
import {AppContext} from "../Global"
import {useSelector, useDispatch} from "react-redux"
import {getIdPersonal} from "../RedusGlobal/Redux"
import {Link, useParams} from "react-router-dom"
import { app} from "../../base"
import firebase from "firebase"
import AssignUser from './AssignUser'


function ExploreProject() {
  const {id} =useParams()
  const dispatch = useDispatch();
  const {data} = useContext(AppContext)
  const {current} = useContext(AppContext)
  const [toggle, setToggle] = React.useState(false)
  const [assignedTo, setassignedTo] = React.useState("")
  const getId = useSelector((state)=> state.myReducer.idProject)
  const [exId, setExid] = React.useState(dispatch(getIdPersonal(id)))
  const [team, setTeam] = React.useState([{staff: ""}])
  const [name, setName] = React.useState("")
  const [members, setMembers] = React.useState([]);
  const [memTask, setMemTask] = React.useState([]);
  const handleToggle = ()=>{
    setToggle(!toggle)
  }

  const viewTeamMemeber = async ()=>{
    
    await app.firestore().collection("workstation")
    .onSnapshot((snapshot)=>{
      const r = []
      snapshot.forEach((doc)=>{
        r.push({...doc.data(), id:doc.id})
      })
      setMembers(r)
      console.log("team:" , members)
    })
  }

  const createTask = async ()=>{
    await app.firestore()
    .collection("workstation")
    .doc(getId)
    .collection("project")
    .doc(id)
    .collection("task")
    .doc()
    .set({
      name,
      assignedTo,
      createdBy: current?.uid,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    })
  }

  const viewTaskTeam = async () =>{
     await app.firestore()
     .collection("workstation")
     .doc(getId)
     .collection("project")
     .doc(id)
     .collection("task")
     .onSnapshot((snapshot)=>{
       const r = []
       snapshot.forEach((doc)=>{
         r.push({...doc.data(), id:doc.id})
       })
       setMemTask(r)
     })
  }

  useEffect(()=>{
    viewTeamMemeber()
    viewTaskTeam()
  },[])


  return (
    <Container>
      <Wrapper>
      <Header>Welcome Back, 
        {data && data.name}
      </Header>
      <Title  >you have <strong>0</strong> Task</Title>
      <ConAll>
        <CreateCon  onClick={()=>{
          handleToggle()
        }} >
         Click To Create Task And Assign
        </CreateCon>
        </ConAll>

        {
            toggle ?  
            
            <ConAll>
            <ConIput placeholder="enter your Task" 
            value ={name}
            onChange={(e)=>{
              setName(e.target.value)
            }}
            
            />
         <div>
          {members.map((props)=>(
            <div>
              {
                props.id === getId ? ( <div>
                  {
                    current.uid === props.createdBy ?
                    <Select
                    value={assignedTo}
                    onChange={(e)=>{
                      setassignedTo(e.target.value)
                    }}
                    >
                       <Option >
                        select member
                     </Option>
                      {props.team.map((props)=>(
                    <Option value={props.staff}>
                      {props.staff}
                     </Option>
                      ))}
                    
                  </Select>:null
                  }
                </div>) : null
              }
              </div>
                
              
          ))}
         </div>
            <ButtonConc
            onClick={()=>{
              createTask()
            }}
            >Assigned</ButtonConc>
            </ConAll>
            
            : null
          }

<ConAll2>
       {
  memTask?.map((props)=>(
           <div key={props.id}>
               <Card>
               <AssignUser image name team={props.assignedTo} />
                 
          <NameCon>{props.name}</NameCon>

          {
            current.uid === props.assignedTo ? (  <ButtonConc1 to ={`/steps/${props.id}`}>explior work the task</ButtonConc1>) :null
          }

        
        </Card>
             </div>
        
         ))
       }
           
           </ConAll2>
       
      
      </Wrapper>
    </Container>
  )
}

export default ExploreProject

const NameCon = styled.div``
const ButtonConc1 = styled(Link)`
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
`

const ConAll2 = styled.div`
font-size: 15px;
font-weight: bold;
width: 100%;
height: auto;

display: flex;
justify-content:center;
align-items: center;
`

const ButtonConc = styled.div`
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
const Option = styled.option`
  width: 315px;
  height: 40px;
  padding: 10px 0;
  margin: 10px 0;
  font-size: 15px;
`;

const Select = styled.select`
  width: 315px;
  height: 40px;
  padding-left: 10px;
  margin-top: 5px;
  outline: none;
  border: 1px solid gray;
`;

const ConIput = styled.input`

height: 40px;
width: 250px;

`

const ConInput2 = styled.input`
height: 30px;
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

const Header = styled.div`
font-size: 15px;
font-weight: bold;
width: 100%;
height: 50px;

display: flex;
justify-content:center;
align-items: center;
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