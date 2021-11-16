import React from 'react'
import styled from "styled-components"
import DataFile from "./DataFile"
import Addfile from "./Addfile"

function Todo() {
  return (
    <Container>
      <Wrapper>
       <Side1>
        <DataFile/>

       </Side1>
       <Side2>
          <Addfile/>
       </Side2>
      </Wrapper>
    </Container>
  )
}

export default Todo

const Side1 = styled.div`
flex: 1;
`
const Side2 = styled.div`
width: 380px;
border-left: 1px solid lightgrey;
`

const Container = styled.div``
const Wrapper = styled.div`
display: flex;

min-height: calc(100vh - 100px);
height: 100%;
flex-wrap: wrap;
`
