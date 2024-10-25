import React from 'react';
import upload_area from '../../assets/upload_area.svg';
import { useState } from 'react';

const AddProduct = () => {

    const [image, setImage] = useState(false);

    const [productDetails, setProductDetails] = useState({
        name: "",
        description: "",
        image: "",
        category: "women",
        new_price: "",
        old_price: ""
    });

    // function for image thumbnail
    const imageHandler = (e) => {
        setImage(e.target.files[0]);
    }

    // function for updating inputs to DataBase
    const changeHandler = (e) => {
        setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
    }

    // uploading product JSON to the database
    const Add_Product = async () => {
        console.log(productDetails);
        let responseData;
        let product = productDetails;
        let formData = new FormData();
        formData.append('product', image);
        await fetch('http://localhost:4000/upload', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
            },
            body: formData,
        }).then((resp) => resp.json())
            .then((data) => { responseData = data });

        if (responseData.success) {
            product.image = responseData.image_url;
            console.log(product);
            await fetch('http://localhost:4000/addproduct', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            })
                .then((resp) => resp.json())
                .then((data) => { data.success ? alert("Product Added") : alert("Failed") });

        }
    }

    return (
        <div className="box-border w-full max-w-[800px] p-8 m-5 rounded-md bg-white">
            {/* Product Title */}
            <div className="w-full text-gray-500 text-lg mb-4">
                <p>Product title</p>
                <input
                    value={productDetails.name} onChange={(e) => { changeHandler(e) }}
                    type="text"
                    name="name"
                    placeholder="Type here"
                    className="box-border w-full h-[50px] rounded-md px-4 border border-gray-300 outline-none text-gray-500 font-poppins text-base"
                />
            </div>

            {/* Product Description */}
            <div className="w-full text-gray-500 text-lg mb-4">
                <p>Product description</p>
                <input
                    type="text"
                    name="description"
                    placeholder="Type here"
                    className="box-border w-full h-[50px] rounded-md px-4 border border-gray-300 outline-none text-gray-500 font-poppins text-base"
                />
            </div>

            {/* Price and Offer Price */}
            <div className="flex gap-10 mb-4">
                <div className="w-full text-gray-500 text-lg">
                    <p>Price</p>
                    <input
                        value={productDetails.old_price} onChange={(e) => { changeHandler(e) }}
                        type="number"
                        name="old_price"
                        placeholder="Type here"
                        className="box-border w-full h-[50px] rounded-md px-4 border border-gray-300 outline-none text-gray-500 font-poppins text-base"
                    />
                </div>
                <div className="w-full text-gray-500 text-lg">
                    <p>Offer Price</p>
                    <input
                        value={productDetails.new_price} onChange={(e) => { changeHandler(e) }}
                        type="number"
                        name="new_price"
                        placeholder="Type here"
                        className="box-border w-full h-[50px] rounded-md px-4 border border-gray-300 outline-none text-gray-500 font-poppins text-base"
                    />
                </div>
            </div>

            {/* Product Category */}
            <div className="w-full text-gray-500 text-lg mb-4">
                <p>Product category</p>
                <select
                    value={productDetails.category} name="category" onChange={changeHandler}
                    className="p-2 w-[100px] h-[50px] text-base text-gray-500 border border-gray-400 rounded-md"
                >
                    <option value="women">Women</option>
                    <option value="men">Men</option>
                    <option value="kid">Kid</option>
                </select>
            </div>

            {/* Product Image */}
            <div className="w-full text-gray-500 text-lg mb-4">
                <p>Product image</p>
                <label htmlFor="file-input">
                    <img
                        className="h-[120px] w-[120px] rounded-lg object-contain cursor-pointer"
                        src={image ? URL.createObjectURL(image) : upload_area}
                        alt=""
                    />
                </label>
                <input onChange={imageHandler} type="file" name="image" id="file-input" accept="image/*" hidden />
            </div>

            {/* Submit Button */}
            <button onClick={Add_Product} className="mt-10 w-[160px] h-[50px] rounded-md bg-[#6079ff] border-none cursor-pointer text-white text-lg font-medium">
                ADD
            </button>
        </div>
    );
};

export default AddProduct;
