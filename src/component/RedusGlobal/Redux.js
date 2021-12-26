import { createSlice } from '@reduxjs/toolkit'

const initialState = {
 idProject :[],
 idPersonal:[],
 idTask:[]
}

const Redux = createSlice({
  name: "any",
  initialState,
  reducers: {
     getIdProject: (state, {payload})=>{
         state.idProject =  payload
     },
     getIdPersonal:(state, {payload})=>{
        state.idPersonal = payload
     },
     getIdTask :(state,{payload})=>{
      state.idTask = payload
     }
  }
});

export const {
  getIdProject,
  getIdPersonal,
  getIdTask
} = Redux.actions
export default Redux.reducer