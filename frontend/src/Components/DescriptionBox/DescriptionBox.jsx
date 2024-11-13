import React from 'react'

export const DescriptionBox = ({product}) => {
    return (
        <div className="mt-28 mx-8 lg:mt-16 lg:mx-12 md:mx-5">
        {/* Tab Section */}
        <div className="flex">
            <div className="flex items-center justify-center text-base font-semibold w-44 h-16 border border-gray-300">
                Description
            </div>
            <div className="flex items-center justify-center text-base font-semibold w-44 h-16 bg-gray-100 text-gray-600 border border-gray-300">
                Reviews (122)
            </div>
        </div>
    
        {/* Content Section */}
        <div className="flex flex-col gap-6 border border-gray-300 p-12 pb-16 md:p-6">
            {product.description}
        </div>
    </div>
    

    )
}
