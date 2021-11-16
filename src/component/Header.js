import React from 'react'
import styled from "styled-components"
import {NavLink} from "react-router-dom"



function Header() {
  return (
    <Container>
      <Wrapper>
        <Logo/>
        <Navigation>
            < Nav to=""  activeClassName="active">Home</Nav>
            < Nav to="/about">About</Nav>
            < Nav to="/todo">Todo</Nav>
            < Nav to="/test2">Test2</Nav>
            < Nav to="/test1">Test1</Nav>
        </Navigation>
      </Wrapper>
    </Container>
  )
}

export default Header
const Logo = styled.div`
width: 100px;
height: 60px;
background-color: white;
margin-right: 10px;
`
const Navigation = styled.div `
display: flex;
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
