import React, { useState, useEffect } from 'react'
import { Items } from '../Items/Items'

export const NewCollections = () => {

  const [new_collection,setNew_collection] = useState([]);

  useEffect(()=>{
    fetch('http://localhost:4000/newcollections')
    .then((response)=>response.json())
    .then((data)=>setNew_collection(data))
  },[])
  return (
    <div className='new-collections  flex flex-col items-center gap-10px h-4/5'>
        <h1  className='text-gray-800 text-xl font-semibold'>NEW COLLECTIONS</h1>
        <hr />
        <div className="collections  grid grid-cols-2 md:grid-cols-4 m-10 gap-5">
            {new_collection.map((item,i)=>{
                return <Items key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
            })}
        </div>
    </div>
  )
}
