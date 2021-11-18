import axios from "axios"

const url =`https://employeeapi-data.herokuapp.com/employee`
const posturl = `https://employeeapi-data.herokuapp.com/employee/postt`

export const getEm = () => axios.get(url)
export const postEm = newEm => axios.post(posturl, newEm)