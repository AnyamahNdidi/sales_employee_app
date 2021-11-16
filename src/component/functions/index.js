import * as api from "../api/index"

export const allem = async ()=>{
  try{
    const {data} = await api.getEm()

    return data
  }catch(error){
    console.log(error)
  }

}