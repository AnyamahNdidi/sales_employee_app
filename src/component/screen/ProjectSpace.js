import React,{useContext} from 'react'
import styled from "styled-components"
import {AppContext} from "../Global"
import {useSelector, useDispatch} from "react-redux"
import {Link, useParams} from "react-router-dom"
import {getIdProject} from "../RedusGlobal/Redux"
import {app} from "../../base"
import firebase from "firebase";

function ProjectSpace() {
  const {data} = useContext(AppContext)
  const {current} = useContext(AppContext)
  const dispatch = useDispatch()
  const {id} = useParams()
  const [toggle, setToggle] = React.useState(false)
  const [name, setName] = React.useState("")
  const [viewpj, setViewPj] = React.useState([])

  console.log(data)
  const workId = useSelector((state)=> state.myReducer.idProject)

  const [idP, setIdp] = React.useState(dispatch(getIdProject(id)))

  
  const handleToggle = ()=>{
    setToggle(!toggle)
  }
  const createProject = async()=>{
   await app.firestore()
   .collection("workstation")
   .doc(workId)
   .collection("project")
   .doc()
   .set({
     name,
     crearedBy: current.uid,
     creadtedAt: firebase.firestore.FieldValue.serverTimestamp(),
   })
  }

  const viewProject = async ()=>{
    await app.firestore().collection("workstation")
    .doc(id)
    .collection("project")
    .onSnapshot((snapshot)=>{
       const r = []
       snapshot.forEach((doc)=>{
          r.push({...doc.data(), id:doc.id})
       })
       setViewPj(r)
       console.log("all project:" , viewpj)
    })
  }

  React.useEffect(()=>{
    viewProject()
  },[])
  
  return (
    <Container>
      <Wrapper>
      <Header>Welcome Back, 
        {data && data.name}
      </Header>
      <Title  >you have <strong>0</strong> project</Title>
      <ConAll>
        <CreateCon  onClick={()=>{
          handleToggle()
        }} >
          Create Project
        </CreateCon>
        </ConAll>


        {
            toggle ?  
            
            <ConAll>
            <ConIput placeholder="create  your Project" 
            value ={name}
            onChange={(e)=>{
              setName(e.target.value)
            }}
            
            />
       
            </ConAll>
            
            : null
          }

     <ConAll>
    <ConCreate
    onClick={()=>{
      createProject()
      console.log(name)
    }}
    >
      create
      </ConCreate>  


      </ConAll> 

      <ConAll2>
       {
  viewpj?.map((props)=>(
           <div key={props.id}>
               <Card>
          <NameCon>{props.name}</NameCon>

          <ButtonConc to ={`/explore/${props.id}`}>explior this project</ButtonConc>

        </Card>
             </div>
        
         ))
       }
           
       
      
      </ConAll2>



      </Wrapper>
    </Container>
  )
}

export default ProjectSpace

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


const Title = styled.div`
font-size: 15px;
font-weight: bold;
width: 100%;
height: 50px;

display: flex;
justify-content:center;
align-items: center;

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
