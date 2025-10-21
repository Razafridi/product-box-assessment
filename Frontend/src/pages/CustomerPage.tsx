import React, { useEffect, useState } from 'react'
import { createCustomerApi, getAllCustomerApi, getAllCustomerTypesApi, updateCustomerApi } from '../service/api'
import type { CustomerDTO, CustomerTypeDTO } from '../interface/interfaces';
import { Link } from 'react-router-dom';
import Modal from '../Components/Modal';
import CustomerForm from '../Components/CustomerForm';

function CustomerPage() {
    const [custList, setCustList] = useState<CustomerDTO[]>([])
    const [types, setTypes] = useState<CustomerTypeDTO[]>([])
    const [open, setOpen] = useState(false);
    const [text, setText] = useState("")
      
    

    const getAllCustomerTypes = async ()=>{
            let res = await getAllCustomerTypesApi();
              if(res.success){
                  setTypes(res.data ?? []);
              }
          }

    const getAllCustomers = async ()=>{
        let res = await getAllCustomerApi();
        if(res.success){
            setCustList(res.data ?? []);
        }
    }
    useEffect(()=>{
        getAllCustomers();
        getAllCustomerTypes();
    }, [])
  return (
    <div className='w-full flex items-center justify-center h-screen '>
      <div className='flex flex-col shadow p-4 max-w-[450px] items-start justify-start'>
        <input onChange={(e)=> setText(e.target.value)} placeholder='Searhch Customer...' className='p-2  w-full border  rounded-sm border-black' />
        <div className='w-full mt-4'>
            {
                custList.filter(x => x.name.toLowerCase().includes(text.toLowerCase())).map((cust) =>{
                    return <Link to={`/view-customer?id=${cust.id}`}><li className='list-none border-b border-gray-400  p-1 text-sm font-semibold cursor-pointer hover:bg-gray-50'>
                        {cust.name}
                    </li></Link>
                })
            }
        
      </div>
      <button className='px-6 py-2 rounded-md text-white bg-green-400 cursor-pointer' onClick={() => setOpen(true)}>Add</button>
      </div>

      <Modal onClose={()=> setOpen(false)} open={open}>
              <CustomerForm  
                  isUpdate={false}
                  customerTypes={types}
                  initialValues={{
                     address:'',
                     city:"",
                     customerTypeId:1,
                     id:0,
                     lastUpdated: "",
                     name:"",
                     state:"",
                     zips:""
                  }}
                  onSubmit={async (data)=> {
                    let res = await createCustomerApi({
                      ...data, customerTypeId: Number(data.customerTypeId)
                    })
                    if(res.success){
                      setOpen(false)
                      getAllCustomers();
                    }else{
                      setOpen(false)
                    }
                  }}
              />
            </Modal>
      
    </div>
  )
}

export default CustomerPage