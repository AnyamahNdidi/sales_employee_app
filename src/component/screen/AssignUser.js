import React,{useContext} from 'react'
import styled from "styled-components"
import {AppContext} from "../Global"
import {app} from "../../base"

function AssignUser({name, image, team}) {
 
  const {current}  = useContext(AppContext)
  const [userData, setUserData] = React.useState([])

  const viewData = async ()=>{
   await app.firestore()
   .collection("users")
   .doc(team)
   .get()
   .then((user)=>{
      setUserData(user.data())
   });
  }
  
  React.useEffect(()=>{
   viewData()

  },[])
  return (
    <Container>
      <Wrapper>
        {image ?   <Img src = {userData?.avatar}/> : null }
         
         <Card>
           {image ? (
             <div>
               {current.uid === team ? (
                 <Card1>you</Card1>
               ) : (
                 userData?.name
               )}
             </div>
           ):null}
         </Card>
       
         
      </Wrapper>
    </Container>
  )
}

export default AssignUser

const Img = styled.img`
  object-fit: cover;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid black;
`;
const Card1 = styled.div`
  font-weight: bold;
`;
const Card = styled.div`
  margin: 0;
  font-weight: bold;
`;

const Container = styled.div`

`
const Wrapper = styled.div`

`
