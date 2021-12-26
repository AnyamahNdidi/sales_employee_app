import React,{useContext, useEffect} from 'react'
import styled from "styled-components"
import {AppContext} from "../Global"
import {app} from "../../base"
import {Link, useParams} from "react-router-dom"
import {useSelector, useDispatch} from "react-redux"
import firebase from "firebase"
import {getIdTask} from "../RedusGlobal/Redux"
import LinearProgress from "@mui/material/LinearProgress";

function CreateSteps() {
  const {id} = useParams()
  const dispatch = useDispatch()
  const {data} = useContext(AppContext)
  const {current} = useContext(AppContext)
  const [toggle, setToggle] = React.useState(false)
  const [steps, setSteps] = React.useState("")
  const [projectStep, setprojectStep] = React.useState([])
  const getPID = useSelector((state)=> state.myReducer.idProject)
  const petPPid = useSelector((state)=> state.myReducer.idPersonal)

  const [saveTask, setSaveTask] = React.useState(dispatch(getIdTask(id)))
  const handleToggle = ()=>{
    setToggle(!toggle)
  }
  const createSteps = async ()=>{
    await app.firestore()
    .collection("workstation")
    .doc(getPID)
    .collection("project")
    .doc(petPPid)
    .collection("task")
    .doc(id)
    .collection("step")
    .doc()
    .set({
      steps,
      confirm:false,
      createdBy: current?.uid,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),

    })
    setSteps("")
  }

  const viewWorkSteps = async ()=>{
    await app.firestore()
    .collection("workstation")
    .doc(getPID)
    .collection("project")
    .doc(petPPid)
    .collection("task")
    .doc(id)
    .collection("step")
    .onSnapshot((snapshot)=>{
      const r = []
      snapshot.forEach((doc)=>{
        r.push({...doc.data(), id:doc.id})
      })
      setprojectStep(r)
      console.log(projectStep)
    })
  }
  useEffect(()=>{
    viewWorkSteps()
  },[])
  return (
  <Container>
    <Wrapper>
    <Header>Welcome Back, 
        {data && data.name}
      </Header>
      <ConAll>
        <CreateCon  onClick={()=>{
          handleToggle()
        }} >
         Click To create to step
        </CreateCon>
        {steps}
        </ConAll>

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
  createSteps()
  console.log(steps)
}}
>Assigned</ButtonConc>
       
            </ConAll>
            
            : null
          }

      <div>
       {
         <Rating
         onClick={()=>{
           const checked = projectStep.filter((el)=> el.confirm === true).length;
           const totalRate = projectStep.length;
           console.log((checked / totalRate) * 100)}}
         >
          <LinearProgress
                variant="determinate"
                value={
                  (projectStep.filter((el) => el.confirm === true).length /
                  projectStep.length) *
                  100
                }
              />
               {Math.ceil(
                (projectStep.filter((el) => el.confirm === true).length /
                projectStep.length) *
                  100
              )}
              %
        
         </Rating>
       }
     </div>

     <ConAll>       
       {
         projectStep?.map((props)=>(
          <Holdd>
            {
              props.confirm ? (
                <Box type="checkbox" checked/>
              ):(<Box type="checkbox" />)
            }
            {props.steps}
       </Holdd>
         
         )) 
       }
       <ButtonConc1 to={`/review`}>view and update your steps</ButtonConc1>
       
     </ConAll>
   

    </Wrapper>
  
  </Container>
  )
}

export default CreateSteps

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

const Box = styled.input`
  width: 20px;
  height: 20px;
  margin-right: 5px;
`;

const Rating = styled.div`
width:200px

`

const Holdd = styled.div`
display: flex;
justify-content:center;
margin:5px 0
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

