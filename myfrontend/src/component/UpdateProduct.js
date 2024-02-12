import React, { useEffect, useState } from 'react';
import {useNavigate, useParams}from 'react-router-dom'

const UpdateProduct=()=>{
    const[name,setName]=useState("")
    const[price,setPrice]=useState("")
    const[category,setCategory]=useState("")
    const[company,setCompany]=useState("")
    const params=useParams();
    const navigate=useNavigate();
    useEffect(()=>{
        getProductDetails()
    },[])
    const getProductDetails=async()=>{
        console.log(params);
        let result=await fetch(`http://localhost:8080/product/${params.id}`,{
          headers: {
            authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
        });
        result=await result.json();
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category)
        setCompany(result.company);
    }
    // const [error,setError]=useState(false);
     const updateProduct= async()=>{
       console.log(name, price, category ,company)
       let result = await fetch(`http://localhost:8080/product/${params.id}`, {
    method: "PUT", // Use "PUT" instead of "Put"
    body: JSON.stringify({ name, price, category, company }),
    headers: {
      "Content-Type": "application/json", // Fix the typo here
      authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
    },
     });
       result= await result.json();
         console.log(result)
         navigate("/")
    }
    return(
        <div className='product'>
        <h1>UpdateProduct</h1>
        <input type='text' placeholder='Enter product name' onChange={(e)=>{setName(e.target.value)}} className='inputBox' value={name}/>
        <input type='text' placeholder='Enter product price' onChange={(e)=>{setPrice(e.target.value)}} className='inputBox' value={price}/>
        <input type='text' placeholder='Enter product category' onChange={(e)=>{setCategory(e.target.value)}} className='inputBox' value={category}/>
        <input type='text' placeholder='Enter product company' onChange={(e)=>{setCompany(e.target.value)}} className='inputBox' value={company}/>
        <button onClick={updateProduct} className='appButton'> Update Product</button>
        </div>
    )
}
export default UpdateProduct;