import React from 'react'
import arrow_icon from '../Assets/arrow.png'
import hero_image from '../Assets/hero_image.png'

export const Hero = () => {
  return (
    <div className='hero h-5/6 flex justify-around items-center py-16'>
        <div className="her0-left">
            <h2 className='text-slate-800 font-bold'>NEW ARRIVALS ONLY</h2>
            <div className='text-4xl font-semibold mt-5'>
                <h1>new</h1>
                <h1>collections</h1>
                <h1>for everyone</h1>
            </div>
            <div className="hero-latest-btn flex justify-center items-center gap-3 rounded-3xl mt-10 bg-red-700 text-white text-lg font-medium p-2">
                <div>Latest Collection</div>
                <img src={arrow_icon} alt="" />
            </div>
        </div>

        <div className="hero-right hidden sm:block">
            <img className='w-52 md:w-80' src={hero_image} alt="" />
        </div>
    </div>
  )
}
