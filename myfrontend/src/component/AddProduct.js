import React, { useState } from 'react';

const AddProduct=()=>{
    const[name,setName]=useState("")
    const[price,setPrice]=useState("")
    const[category,setCategory]=useState("")
    const[company,setCompany]=useState("")
    const [error,setError]=useState(false);
     const productCollect= async()=>{
       console.log(name, price, category ,company)
       if(!name || !price || !category || !company){
        setError(true);
        return false;
       }
       const userId=JSON.parse(localStorage.getItem('user'))._id;
       let result=await fetch("http://localhost:8080/add-product",{
        method:'post',
        body:JSON.stringify({name, price, category ,company,userId}),
        headers:{
            "Content-Type":"application/json",
          
             authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            
        }
       })
       result=await result.json();
       console.log(result); 
    }
    return(
        <div className='product'>
        <h1>AddProduct</h1>
        <input type='text' placeholder='Enter product name' onChange={(e)=>{setName(e.target.value)}} className='inputBox' value={name}/>
        {error && !name && <span className='invalid-input'>Enter valid name</span>}
        <input type='text' placeholder='Enter product price' onChange={(e)=>{setPrice(e.target.value)}} className='inputBox' value={price}/>
        {error && !price && <span className='invalid-input'>Enter price</span>}
        <input type='text' placeholder='Enter product category' onChange={(e)=>{setCategory(e.target.value)}} className='inputBox' value={category}/>
        {error && !category && <span className='invalid-input'>Enter valid category</span>}
        <input type='text' placeholder='Enter product company' onChange={(e)=>{setCompany(e.target.value)}} className='inputBox' value={company}/>
        {error && !company &&  <span className='invalid-input'>Enter valid company</span>}
        <button onClick={productCollect} className='appButton'> Add Product</button>
        </div>
    )
}
export default AddProduct;