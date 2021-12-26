import React, { useState, useEffect, useContent, useContext } from "react";
import styled from "styled-components";
import AddBoxIcon from "@mui/icons-material/AddBox";
import {AppContext} from "../Global"
import {useSelector, useDispatch} from "react-redux"
import {Link, useParams} from "react-router-dom"
import {app} from "../../base"
import AssignUser from "./AssignUser"

function PersonalProject() {
  const dispatch = useDispatch();
  const {data} = useContext(AppContext)
  const {current} = useContext(AppContext)
  const [toggle, setToggle] = React.useState(false)
  const getId = useSelector((state)=> state.myReducer.idProject)
  const [space, setspace] = React.useState([])

  const handleToggle = ()=>{
    setToggle(!toggle)
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

      <ConAll2>
       {
  space?.map((props)=>(
           <div key={props.id}> 
             {
              props.team.find((el)=>{
                return el.staff === current.uid
              }) ? ( <Card>
                <NameCon>{props.name}</NameCon>
      
                <ButtonConc to = {`/project/${props.id}`}>explior work space</ButtonConc>
      
              </Card>):null
             }
              
             </div>
        
         ))
       }
      
      </ConAll2>
      <ConAll2>
      {
  space?.map((props)=>(
    
           <div > 
             {
               current.uid === props.createdBy ? (
                 <div>
                   {
                     props.team.map((props)=>(
                        <div>
                          <AssignUser  image avatar team={props.staff}/>
                          </div>
                     ))
                   }

                 </div>

               ):null
             }
            
              
             </div>
        
         ))
       }
      </ConAll2>
     </Wrapper>
   </Container>
  )
}

export default PersonalProject

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

const NameCon = styled.div``

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

const ConAll2 = styled.div`
font-size: 15px;
font-weight: bold;
width: 100%;
height: auto;

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

const Title = styled.div`
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
