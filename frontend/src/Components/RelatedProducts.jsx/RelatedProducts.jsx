import { Items } from "../Items/Items";

import React, { useEffect, useState } from 'react'

import { backend_url } from '../../App';


const RelatedProducts = ({ category, id }) => {

  const [related, setRelated] = useState([]);



  useEffect(() => {
    fetch(`${backend_url}/relatedproducts`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ category: category }),
    })
      .then((res) => res.json()).then((data) => setRelated(data))
  }, [])

  return (
    <div className="flex flex-col items-center gap-3 pt-2 pb-24 mt-20">
      <h1 className="text-gray-900 text-4xl font-semibold md:text-2xl">Related Products</h1>
      <hr className="w-24 h-1 rounded-lg bg-gray-800 md:w-36" />
      <div className="mt-12 w-full flex flex-wrap justify-center gap-8 max-w-screen-xl">
        {related.map((item, index) => {
          if (id !== item.id) {
            return (
              <Items
                key={index}
                id={item.id}
                name={item.name}
                image={item.image}
                new_price={item.new_price}
                old_price={item.old_price}
              />
            );
          }
        })}
      </div>
    </div>

  )
}

export default RelatedProducts;
