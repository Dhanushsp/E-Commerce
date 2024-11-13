import React from 'react'
import exclucive_image from '../Assets/exclusive_image.png'

export const Offers = () => {
  return (
    <div style={{
      color: 'rgb(238, 130, 238)',
      boxShadow: 'rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset'
    }} className='offers w-4/5 m-auto flex flex-col md:flex-row py-24 px-16 items-center rounded-3xl'>
      <div className="offers-left flex-1 flec flex-col justify-center items-center">
        <h1 className='text-gray-900 text-2xl md:text-4xl font-semibold'>Exclusive</h1>
        <h1 className='text-gray-900 text-2xl md:text-4xl font-semibold'>Offers For You</h1>
        <h1 className='text-gray-700 text-lg md:text-xl font-semibold'>ONLY ON BEST SELLERS PRODUCTS</h1>
        <button className='w-48 h-12 md:72 md:16 rounded-3xl bg-red-700 text-white text-xl font-medium mt-8 cursor-pointer'>Check now</button>
      </div>

      <div className="offers-right flex-1 flex items-center justify-end ">
        <img src={exclucive_image} alt="" />
      </div>
    </div>
  )
}
