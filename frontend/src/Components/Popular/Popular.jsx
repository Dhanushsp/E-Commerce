import React, { useEffect, useState } from 'react'
import { Items } from '../Items/Items'

export const Popular = () => {

  const [data_product, setData_Product] = useState([]);

  useEffect(()=>{
    fetch('http://localhost:4000/popularinwomen')
    .then((res)=>res.json())
    .then((data)=>setData_Product(data))
  }, [])
  return (
    <div className='popular flex flex-col items-center gap-10px h-4/5'>
        <h1 className='text-gray-800 text-xl font-semibold'>POPULAR IN WOMEN</h1>
        <hr className='w-200px h-6px rounded-md bg-slate-800' />
        <div className="grid grid-cols-2 gap-10 m-10 md:grid-cols-4 text-sm sm:text-base">
            {data_product.map((item, i)=>{
                return<Items key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
            })}
        </div>
    </div>
  )
}
