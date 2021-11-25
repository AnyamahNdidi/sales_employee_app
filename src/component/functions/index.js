import * as api from "../api/index"

 const allem = async ()=>{
  try{
    const {data} = await api.getEm()

    return data
  }catch(error){
    console.log(error)
  }

}
const creatEm =async (post)=>{
 const {data} = await api.postEm(post)
 return data
}


const updateEmm = async (id, updateEmm)=>{
 const {data} = await api.updateStaff(id, updateEmm)
 return data
}

const deleteEm =async (id)=>{
  try{
    await api.deletStaff(id)
  }catch(error){
    console.log(error)
  }
  
}

export {updateEmm, creatEm,allem, deleteEm}