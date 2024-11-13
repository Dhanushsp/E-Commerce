import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { useParams } from 'react-router-dom';
import Breadcrums from '../Components/Breadcrums/Breadcrum';
import { ProductDisplay } from '../Components/Productdisplay/Productdisplay';
import { DescriptionBox } from '../Components/DescriptionBox/DescriptionBox';
import RelatedProducts from '../Components/RelatedProducts.jsx/RelatedProducts';


export const Product = () => {
  const { all_product } = useContext(ShopContext);
  const { productId } = useParams();
  const product = all_product.find((e) => e.id === Number(productId))

  console.log("Product ID:", productId);
console.log("Product Data:", product);


  return (
    <div>
      <Breadcrums product={product} />
      <ProductDisplay product={product}/>
      {/* <DescriptionBox product={product}/> */}
      <RelatedProducts id={product.id} category={product.category}/>
    </div>
  )
}


