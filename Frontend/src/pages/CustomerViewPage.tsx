import React, { useEffect, useState } from 'react'
import { useNavigate, useNavigation, useSearchParams } from 'react-router-dom'
import type { CustomerDTO, CustomerTypeDTO } from '../interface/interfaces';
import { createCustomerApi, deleteCustomerApi, getAllCustomerTypesApi, getCustomerByIdApi, updateCustomerApi } from '../service/api';
import Row from '../Components/Row';
import Modal from '../Components/Modal';
import CustomerForm from '../Components/CustomerForm';

function CustomerViewPage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  let id = Number(params.get("id"))

  const [cust, setCust] = useState<CustomerDTO | null>(null)
  const [types, setTypes] = useState<CustomerTypeDTO[]>([])

  const [open, setOpen] = useState(false);
  
      const getCustomerById = async ()=>{
          let res = await getCustomerByIdApi(id);
          if(res.success){
              setCust(res.data);
          }
      }

      const getAllCustomerTypes = async ()=>{
        let res = await getAllCustomerTypesApi();
          if(res.success){
              setTypes(res.data ?? []);
          }
      }
      useEffect(()=>{
        getAllCustomerTypes();  
        getCustomerById();
      }, [])
    if(cust == null){
        return <div>Not found</div>
    }

    return <div className="max-w-xl mx-auto mt-10 bg-white shadow p-6 rounded-xl">
      <h2 className="text-2xl font-semibold mb-4">Customer Details</h2>

      <div className="space-y-2 text-gray-700">
        <Row label="ID" value={cust.id} />
        <Row label="Name" value={cust.name} />
        <Row label="Description" value={cust.description ?? "-"} />
        <Row label="Address" value={`${cust.address}, ${cust.city}, ${cust.state}`} />
        <Row label="ZIP" value={cust.zips} />
        <Row label="Customer Type" value={cust.customerType?.name ?? "-"} />
        <Row label="Last Updated" value={new Date(cust.lastUpdated).toLocaleDateString()} />
      </div>
      
      <div className='mt-6 p-2 flex gap-4'>
        <button className='px-6 py-2 rounded-md text-white bg-blue-400 cursor-pointer' onClick={()=>setOpen(true)}>Edit</button>
        <button onClick={async ()=> {
          let res = await deleteCustomerApi(cust.id)
          if(res.success){
            getCustomerById();
            navigate(-1)
          }

        }} className='px-6 py-2 rounded-md text-white bg-red-400 cursor-pointer'>Delete</button>
      </div>

      <Modal onClose={()=> setOpen(false)} open={open}>
        <CustomerForm  
            isUpdate
            customerTypes={types}
            initialValues={{
                ...cust,customerTypeId: cust.customerType?.id ?? 0
            }}
            onSubmit={async (data)=> {
              let res = await updateCustomerApi({
                                    address:data.address,
                                    city: data.city,
                                    id: data.id,
                                    name: data.name,
                                    state: data.state,
                                    typeId: Number(data.customerTypeId),
                                    zips: data.zips,
                                    description: data.description
                                  })
                                  if(res.success){
                                    setOpen(false)
                                    getCustomerById();

                                  }else{
                                    setOpen(false)
                                  }
            }}
        />
      </Modal>
    </div>
}

export default CustomerViewPage

