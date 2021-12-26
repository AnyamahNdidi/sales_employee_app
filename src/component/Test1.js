import React from 'react'
import {motion} from "framer-motion"
import styled from "styled-components"

function Test1() {
  return (
    <div>
    <br/>
    <br/>
  
     {/* <motion.h1 animate={{color:"pink", y:250, fontSixw:30}}>
     this is test one
    </motion.h1> */}
    <center>
    <motion.div 
    animate={{ x:0, opacity:1}}
    initial={{x:"200px", opacity:0}}
    transition={{delay:1.3, duration:3, type:"spring",
    stiffness:800
    }}
    >
    <div>HQ</div>
    <div>judith</div>
    <div>judith@gmail.com</div>
    <div>guaklh;fs'ghl ;ofhvo;hfio;vs flvio;hfvi;ohf nlkv;vf </div>
    <motion.button  whileHover={{scale:1.3}} >start now</motion.button>
    
    <But whileHover={{ scale:1.3,type:"spring", stiffness:400}} >start now</But>
    </motion.div>
    </center>
    
    </div>
  )
}

export default Test1

const But = styled(motion.div)`
height:50px;
width:150px;
color:white;
font-size:20px;
display:flex;
justify-content:center;
align-items:center;
cursor:pointer;
background-color:pink;
border-radius:10px;
margin-top:10px;
`
