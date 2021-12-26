import React, {useContext} from 'react'
import styled from "styled-components"
import {AppContext} from "../Global"
import { useSelector, useDispatch } from "react-redux";
import {app} from "../../base"
import firebase from 'firebase';
import {Link} from "react-router-dom"
import {useNavigate} from "react-router-dom"

function Reviews() {
  const {current} = useContext(AppContext)
  const navigate = useNavigate()
  const {data} = useContext(AppContext)
  const [toggle, setToggle] = React.useState(true)
  const getPID = useSelector((state)=> state.myReducer.idProject)
  const petPPid = useSelector((state)=> state.myReducer.idPersonal)
  const getTask = useSelector((state)=> state.myReducer.idTask)
  const [Taskpp, setTaskpp] = React.useState([])
  const [steps, setSteps] = React.useState("")
  const [onConfirm, setonConfirm] = React.useState(false)
  const handleToggle = ()=>{
    setToggle(!toggle)
  }
const createStepsUpdate = async (id)=>{
  await app.firestore()
  .collection("workstation")
  .doc(getPID)
  .collection("project")
  .doc(petPPid)
  .collection("task")
  .doc(getTask)
  .collection("step")
  .doc(id)
  .update({
    confirm :true
  })
  setSteps("")
}

  const getAllTask = async ()=>{
    await app.firestore().collection("workstation")
    .doc(getPID)
    .collection("project")
    .doc(petPPid)
    .collection("task")
    .doc(getTask)
    .collection("step")
    .onSnapshot((snapshot)=>{
      const r = []
      snapshot.forEach((doc)=>{
          r.push({...doc.data(), id:doc.id})
      })
      setTaskpp(r)

    })
  }

  React.useEffect(()=>{
    getAllTask()
  })


  return (
   <Container>
     <Wrapper>
     <Header>Welcome Back, 
        {data && data.name}
      </Header>
      {
            toggle ?  
            
            <ConAll>
            <ConIput placeholder="map your steps" 
            value ={steps}
            onChange={(e)=>{
              setSteps(e.target.value)
            }}
            
            />

<ButtonConc 
onClick={()=>{
  createStepsUpdate ()
  console.log(steps)
}}
>Assigned more steps</ButtonConc>
       
            </ConAll>
            
            : null
          }

<ConAll>       
       {
         Taskpp?.map((props)=>(
          <Holdd>
            {
              props.confirm ? (
                <Box type="checkbox" checked/>
              ):(<Box type="checkbox" 
                 disabled
              value ={onConfirm}
              onChange={(e)=>{
                setonConfirm(true)
              }}  
              />)
            }
            {props.steps}

            {
              props.confirm ? ( <ButtonConc1 >Good job</ButtonConc1>):(
                <ButtonConc1 
                
                onClick={()=>{
                  createStepsUpdate (props.id)
                  console.log(props.id);
                }}
                
                >Done</ButtonConc1>
              )
            }
       </Holdd> 
         )) 
       }
      <ButtonConc1
      onClick={()=>{
        navigate(-1)
      }}
      >
        Okay for now 
        </ButtonConc1>

       
     </ConAll>

    
     </Wrapper>
   </Container>
  )
}

export default Reviews

const ButtonConc1 = styled.div`
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

const Box = styled.input`
  width: 20px;
  height: 20px;
  margin-right: 5px;
`;

const Rating = styled.div`
width:200px
height: 10px;
background-color: black;
`

const Holdd = styled.div`
display: flex;
justify-content:center;
margin:5px 0
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

const ConIput = styled.input`

height: 40px;
width: 250px;

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

const Wrapper = styled.div`
  flex-direction: column;
  display: flex;
  align-items: center;
  padding-top: 50px;
`;

const Container = styled.div`
  width: 100%;
  min-height: calc(100vh - 100px);
  height: 100%;

`;

