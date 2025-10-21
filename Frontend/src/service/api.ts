import axios from "axios"
import type { CustomerCreateDto, CustomerDTO, CustomerTypeDTO, CustomerUpdateDto, ResultReponse } from "../interface/interfaces"

const SERVER_URL = 'http://localhost:5271/api/'

export const getAllCustomerApi = async (): Promise<ResultReponse<CustomerDTO[]>> =>{
    try{
        let res = await axios.get(`${SERVER_URL}Customer/GetAllCustomers`)
        return (res.data as ResultReponse<CustomerDTO[]>)
    }catch(e:any){
        return {data: null,success: false}
    }
}

export const getCustomerByIdApi = async (id:number): Promise<ResultReponse<CustomerDTO>> =>{
    try{
        let res = await axios.get(`${SERVER_URL}Customer/GetCustomerById?customerId=${id}`)
        return (res.data as ResultReponse<CustomerDTO>)
    }catch(e:any){
        return {data: null,success: false}
    }
}

export const getAllCustomerTypesApi = async (): Promise<ResultReponse<CustomerTypeDTO[]>> =>{
    try{
        let res = await axios.get(`${SERVER_URL}CustomerType/GetAllCustomerTypes`)
        return (res.data as ResultReponse<CustomerTypeDTO[]>)
    }catch(e:any){
        return {data: null,success: false}
    }
}

export const updateCustomerApi = async (data:CustomerUpdateDto): Promise<ResultReponse<boolean>> =>{
    try{
        let res = await axios.put(`${SERVER_URL}Customer/UpdateCustomer`,data)
        return (res.data as ResultReponse<boolean>)
    }catch(e:any){
        return {data: null,success: false}
    }
}

export const createCustomerApi = async (data:CustomerCreateDto): Promise<ResultReponse<boolean>> =>{
    try{
        let res = await axios.post(`${SERVER_URL}Customer/AddCustomer`,{
            name: data.name,
            description:data.description,
            address: data.address,
            city: data.city,
            state: data.state,
            zips: data.zips,
            typeId: Number(data.customerTypeId) ,
            })
        return (res.data as ResultReponse<boolean>)
    }catch(e:any){
        return {data: null,success: false}
    }
}

export const deleteCustomerApi = async (customerid:number): Promise<ResultReponse<boolean>> =>{
    try{
        let res = await axios.delete(`${SERVER_URL}Customer/DeleteCustomer?customerId=${customerid}`)
        return (res.data as ResultReponse<boolean>)
    }catch(e:any){
        return {data: null,success: false}
    }
}