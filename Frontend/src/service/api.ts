import axios from "axios"
import type { CustomerDTO, ResultReponse } from "../interface/interfaces"

const SERVER_URL = 'http://localhost:5271/api/'

export const getAllCustomerApi = async (): Promise<ResultReponse<CustomerDTO>> =>{
    try{
        let res = await axios.get(`${SERVER_URL}Customer/GetAllCustomers`)
        return (res.data as ResultReponse<CustomerDTO>)
    }catch(e:any){
        return {data: null,success: false}
    }
}