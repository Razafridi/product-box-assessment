import React, { useEffect } from 'react'
import { getAllCustomerApi } from './service/api';

function App() {
  const getAllCustomers = async () =>{
    const res = await getAllCustomerApi();
    console.log("Res", res);
  }
  useEffect(()=>{
    getAllCustomers()
  }, [])
  return (
    <div className='text-red-500'>

    </div>
  )
}

export default App