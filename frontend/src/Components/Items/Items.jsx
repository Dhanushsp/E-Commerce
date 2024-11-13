import React from 'react'
import { Link } from 'react-router-dom'

export const Items = (props) => {
    return (
        <div className=' w-350px transition duration-[600ms] ease-in-out transform hover:scale-105 '>
            <Link to={`/product/${props.id}`}><img onClick={window.scrollTo(0, 0)} src={props.image} alt="" className='rounded-md' /></Link>
            <p className='my-6px font-bold'>{props.name}</p>
            <div className="item-prices flex items-center">
                <div className="item-price-new text-18px mr-3 bg-gray-300 px-3 py-2 rounded-lg">
                    ₹{props.new_price}
                </div>
                <div className="item-price-old text-gray-600 text-18px font-medium line-through">
                    ₹{props.old_price}
                </div>
            </div>
        </div>
    )
}
