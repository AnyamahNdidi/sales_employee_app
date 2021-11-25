import React,{useContext} from 'react'
import styled from "styled-components"
import {AiOutlineSearch, AiOutlineClear,AiFillEdit,AiOutlineFolderView,AiFillDelete} from "react-icons/ai"
import {GrFormView} from "react-icons/gr"
import {allem,deleteEm} from "./functions/index"
import CircularProgress from "@mui/material/CircularProgress";
import {AppContext} from "./Global"

export interface DatePickerAsControllerProps {
  control: any;
  name: string;
  value: Moment;
  rules?: any;
  classes?: string[];
  label: string;
  onChange: (date: Moment) => void;
}


const style = { color:"white", fontSize: "1.5em", marginTop:"0px" }



function DataFile() {
//  const [file, setFile] = React.useState(null)

 const{todo, setTodo, currentID, setCurentID, file, setFile} = useContext(AppContext)

 const getData = async ()=>{
   const result  = await allem()
   if(result){
     setFile(result)
   }
  console.log(result)
 }

 const deleteSt = async(id)=>{
   await deleteEm(id)
   const allstafes = [...file]
   allstafes.filter(data => data.id !== id)
   setFile(allstafes)
 }

 React.useEffect(()=>{
   getData()
 },[currentID])

 React.useEffect(()=>{
   let currentEm = currentID != 0 ? file.find(data => data._id === currentID) : {

    fullName:"",
    email:"",
    address:"",
    department:"",
    dob:"",
    active:""

   }
   setTodo(currentEm)
 },[currentID])


  return (
    <Container>
      <Wrapper>
        <Search>
          <SeIcon>
            
          </SeIcon>

          <InputSearch placeholder="search by name.."/>
          <InputSelect >
          <InputOption>department</InputOption>
          <InputOption>Mangement </InputOption>
          <InputOption>Operatio Officer</InputOption>
          <InputOption>Sales Rep</InputOption>
          </InputSelect>
          <Cleaner>
          <AiOutlineClear />
      
          </Cleaner>
         

        </Search>

        <DataCon>
          <DataHead>
            <NameD>
             Name
            </NameD>
            <ConEmail>
              E-mail

</ConEmail>
            <Depart>
           Department
            </Depart>
           
            <ConActive>
      Active
            </ConActive>

          </DataHead>
          <DataInfo>
            {
              !file ? <CircularProgress/> : file?.length > 0 ?
              <div>
                {
                  file?.map((props)=>(
                    <div>
                     
                    <DataAll>
                      <NameIn>
                       { props.fullName}
                      </NameIn>
                      <EmailInfo>
                      { props.email}
                      </EmailInfo>
                  <DepartMent>
                  { props.department}
                  </DepartMent>
                  <ActineInfo>
                  { props.active}
                  </ActineInfo>
                  <ConVDE>
                  <ConView>
                   <AiOutlineFolderView style={style}/>
                 
                       View
                   </ConView>
                   <ConEdit
                  
                  onClick={()=>{
                    setCurentID(props._id)
                    console.log(currentID)
                  }}
                   >
                     <AiFillEdit style={style}/>
                        Edit
                   </ConEdit>
                   <ConDelete
                   onClick={(e)=>{
                    deleteSt(props._id)
                  
                   }}
                   >
                     <AiFillDelete style={style}/>
                        Delete
                   </ConDelete>
                  </ConVDE>
                    </DataAll>
        
                        </div>
                  ))
                }

              </div>:
              <div>  NO EMPLOYEE YET            </div>
            }
         </DataInfo>
       

        </DataCon>
        
      </Wrapper>
    </Container>
  )
}

export default DataFile

const viewCon = styled(GrFormView)`
width: 25px;
height: 25px;
margin-top: 10px;
margin-right: 25px;
color: white;

`

const ConView = styled.div`
width: 80px ;
height: 40px;
background-color:green;
display: flex;
justify-content: center;
align-items: center;
color: white;
border-radius: 5px;
cursor: pointer;

`
const ConDelete = styled.div`
width: 80px ;
height: 40px;
background-color:red;
display: flex;
justify-content: center;
align-items: center;
color: white;
border-radius: 5px;
cursor: pointer;
`
const ConEdit = styled.div`
width: 80px ;
height: 40px;
background-color:lightblue;
display: flex;
justify-content: center;
align-items: center;
color: white;
border-radius: 5px;
cursor: pointer;
`

const ConVDE = styled.div`
height: 50px;
flex: 1;

align-items: center; 
display: flex;
justify-content: space-around;
`

const ActineInfo = styled.div`
height: 50px;
width: 60px;
align-items: center; 
display: flex;
`
const DepartMent = styled.div`
height: 50px;
width: 170px;
align-items: center; 
display: flex;

`
const EmailInfo = styled.div`
height: 50px;
width: 210px;
align-items: center; 
display: flex;
`
const NameIn = styled.div`
height: 50px;
width: 160px;
align-items: center; 
display: flex;
padding-left: 10px;
`
const DataAll = styled.div`
display: flex;
border-bottom: 1px solid lightgrey;
height: 60px;


`

const DataInfo = styled.div`
height: 450px;
overflow-y: scroll;

`

const ConActive = styled.div`
height: 50px;
width: 60px;
align-items: center; 
display: flex;


`
const ConEmail = styled.div`

height: 50px;
width: 210px;
align-items: center; 
display: flex;
`
const Depart = styled.div`

height: 50px;
width: 170px;
align-items: center; 
display: flex;

`
const NameD = styled.div`
height: 50px;
width: 160px;
align-items: center; 
display: flex;
padding-left: 10px;
`

const DataHead = styled.div`
width: 100%;
height: 50px;
border-bottom: 1px solid lightgrey;
display: flex;
color: black;
background-color:lightgrey;
`

const DataCon = styled.div`
width: 920px;
height: 500px;
border: 1px solid lightgrey;
border-radius: 5px;
display: flex;
flex-direction: column;


`

const iconClear = styled(AiOutlineClear)`

width: 25px;
height: 25px;
margin-top: 10px;
margin-right: 25px;

`

const Cleaner = styled.div`
margin-right: 25px;
width: 60px;
height: 43px;
background-color:lightgrey;
border-radius: 5px;
display: flex;
justify-content: center;
align-items: center;
`

const InputOption = styled.option``
const InputSelect = styled.select`
outline: none;
border: none;
height: 43px;
border-radius: 5px;
background-color:lightgrey;
font-size: 20px;
color: grey;
width: 250px;
padding-right:15px;
padding-left: 5px;
margin-right: 25px;
`

const InputSearch = styled.input`
outline: none;
border: none;
border-radius: 5px;
font-size: 20px;
height: 40px;
background-color:lightgrey;
padding-left:10px;
margin-right: 25px;

`

const SeIcon = styled(AiOutlineSearch)`
width: 25px;
height: 25px;
margin-top: 10px;
margin-right: 25px;

`

const Container = styled.div``
const Wrapper = styled.div`
display: flex;
flex-direction: column;
padding-left: 20px;
padding-top: 20px;
`
const Search = styled.div`
width: 920px;
height: 50px;

display: flex;
padding: 5px;


`