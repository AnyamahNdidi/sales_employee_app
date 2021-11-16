import React from 'react'
import styled from "styled-components"

function Addfile() {
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
        <ConInput></ConInput>
        <ConLabel>E-mail</ConLabel>
        <ConInput></ConInput>
        <ConLabel>Address</ConLabel>
        <ConInput></ConInput>
        <ConLabel>DepartMent</ConLabel>
        <InputSelect >
          <InputOption>Mangement </InputOption>
          <InputOption>Operatio Officer</InputOption>
          <InputOption>Sales Rep</InputOption>
          </InputSelect>
         <ConLabel>Active</ConLabel>
        <InputSelect >
          <InputOption>true</InputOption>
          <InputOption>false</InputOption>
          </InputSelect>
       
      </AllInput>
      <AllButton>
        <Button ck="#2AB7CA">Cancel</Button>
        <Button clr="#2AB7CA" ck="white">Add</Button>
      </AllButton>

      </InputCon>
    </Wrapper>
  </Container>
  )
}

export default Addfile

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
