import React, {useContext} from 'react'
import styled from "styled-components"
import {NavLink} from "react-router-dom"
import {AppContext} from "./Global"



function Header() {

  const {current} = useContext(AppContext)
  return (
    <Container>
      <Wrapper>
        <Logo/>
        <Navigation>
            < Nav to=""  activeClassName="active">Home</Nav>
            < Nav to="/workspace">My workspace</Nav>
            < Nav to="/todo">Todo</Nav>
            < Nav to="/test2">Test2</Nav>
            < Nav to="/test1">Test1</Nav>
            < Nav to="/personal">Ny project</Nav>

        </Navigation>
        {current && current.uid}
        <ConLog>
          <LoginCon to="/register">
            Login
          </LoginCon>
          <SignOut to="">
            Logout
          </SignOut>
        </ConLog>
      </Wrapper>
    </Container>
  )
}

export default Header
const ConLog = styled.div`
display: flex;
width: 300px;
display: flex;
height: 50px;
justify-content:space-around;
`
const LoginCon = styled(NavLink)`
height:50px;
width: 100px;
color: white;
background-color: grey;
display: flex;
justify-content:center;
align-items: center;
border-radius: 5px;
cursor: pointer;
text-decoration: none;

`
const SignOut = styled.div`
height:50px;
width: 100px;
color: white;
background-color: grey;
display: flex;
justify-content:center;
align-items: center;
border-radius: 5px;
cursor: pointer;
`


const Logo = styled.div`
width: 100px;
height: 60px;
background-color: white;
margin-right: 400px;

`
const Navigation = styled.div `
display: flex;
width: 500px;
margin-right: 60px;
display: flex;
justify-content: space-around;
`
const Nav = styled(NavLink)`
padding: 15px;
display: flex;
justify-content: center;
align-items: center;
color:  #e6e6ea;
text-decoration: none;


&.active{
  padding: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #e6e6ea;
  text-decoration: none;
  cursor: pointer;
  background-color: #fe4a49;
  height: 20px;
}
:hover{
  cursor: pointer;
  background-color:grey;
  color: white;
}
`

const Container = styled.div`
height: 80px;
width: 100%;
background-color: #2ab7ca ;
`
const Wrapper = styled.div`
display: flex;
padding: 10px;
align-items: center;
`
