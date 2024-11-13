import React from 'react'

export const NewsLetter = () => {
  return (
    <div className='NewsLetter w-2/3 h-2/5 flex flex-col items-center justify-center m-auto py-16 lg:py-24 gap-4'>
        <h1 className='text-gray-800 text-2xl lg:text-4xl font-semibold text-center'>Get Exclusive ofers on your Email</h1>
        <p className='text-gray-500 text-base lg:text-2xl '>Receive updates</p>
        <div className='flex items-center justify-center bg-white w-3/4 h-16 rounded-2xl border-black'>
            <input className='w-96 ml-8 border-none text-white bg-gray-200 p-2 lg:p-3 rounded-xl m-3 outline-none' type="email" placeholder='Your E-mail Id' />
            <button className='bg-black text-white text-sm lg:text-base py-3 px-5 rounded-lg'>Subscribe</button>
        </div>
    </div>
  )
}
