import React,{useState, useEffect} from 'react'
import styled from "styled-components"
import {app} from "../../base"
import firebase from "firebase"
import {useNavigate} from "react-router-dom"

function Register() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [displayCover, setDisplayCover] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [percent, setPercent] = useState(0.00001);
  const Navigate = useNavigate()



  const uplaodImage  = async (e) =>{
     
    const file = e.target.files[0]
    const save = URL.createObjectURL(file)
    setDisplayCover(save)

    const fileRef  = await app.storage().ref();
    const storeRef = fileRef.child("avatar/" + file.name).put(file);

    storeRef.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        (snapShot)=>{
          const counter = (snapShot.bytesTransferred / snapShot.totalBytes ) * 100
          setPercent(counter)
          console.log(counter)
        },
        (err)=> console.log(err.message),
        ()=>{
          storeRef.snapshot.ref.getDownloadURL().then((URL)=>{
             setAvatar(URL)
             console.log(URL);
          })
        }
    )
  }

  const Reg = async ()=>{
 const saveUse = await app.auth().createUserWithEmailAndPassword(email, password);

 if (saveUse){
   await app.firestore().collection("users").doc(saveUse.user.uid).set({
     avatar, 
     name, 
     password, 
     email,
     createdBy : saveUse.user.uid
   })
   Navigate("/workspace")

 }
  }
  return (

   
   <Container>
     <Wrapper>
       <Title>Register</Title>
       <Card>
         <Image src={displayCover}/>
         <ImputImage type="file" id="picture" onChange={uplaodImage}/>
         <Label  htmlFor="picture">Upload an Image</Label>

         <Input placeholder="name" 
         value ={name}
         onChange={(e)=>{
          setName(e.target.value)
         }}
         
         />
         <Input placeholder="email"
           value ={email}
           onChange={(e)=>{
            setEmail(e.target.value)
           }}
         />
         <Input placeholder="password"
           value ={password}
           onChange={(e)=>{
            setPassword(e.target.value)
           }}
         />

         <Button
         onClick={()=>{
           console.log(name, email, password);
           Reg()
         }}
         >Sign Up</Button>

       </Card>
     </Wrapper>
   </Container>
  )
}

export default Register
const Button = styled.div`
height: 50px;
width: 150px;
background-color:#2ab7ca;
margin-top: 10px;
display: flex;
justify-content:center;
align-items: center;
color: white;
border-radius: 5px;
cursor: pointer;


`
const Input = styled.input`
height: 40px;
margin-top: 10px;
width: 320px;
`

const Label = styled.label`

width: 200px;
height: 50px;
background-color: #2ab7ca ;
border-radius: 10px;
display: flex;
justify-content: center;
align-items: center;
cursor: pointer;
color: white;
margin-top:10px
`

const ImputImage = styled.input`
display: none;
`

const Image = styled.img`
height: 100px;
width: 100px;
border-radius: 50%;
background-color:lightgrey;
`

const Title = styled.div`
width: 400px;
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
flex-direction: column;
align-items: center;
`
const Wrapper = styled.div`
margin-top: 50px;

`
const Card = styled.div`
width: 400px;
border: 1px solid lightgrey;
border-radius: 5px;
height: 450px;
display: flex;
padding-top: 15px;
flex-direction: column;
align-items: center;

`
