import axios from "axios"

const url =`https://employeeapi-data.herokuapp.com/employee`

export const getEm = () => axios.get(url)