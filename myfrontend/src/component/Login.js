import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Login=()=>{
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const navigate= useNavigate();
useEffect(()=>{
    const auth= localStorage.getItem('user');
    if (auth){
        navigate('/');
    }
})

    const handleLogin=async()=>{
        console.log({email,password});
        let result=await fetch('http://localhost:8080/login',{
            method:"post",
            body:JSON.stringify({email,password}),
            headers:{
                'Content-type':'application/json'
            }
        });
        result=await result.json();
        console.warn(result)
        if (result.auth){
           localStorage.setItem("user",JSON.stringify(result.User));
           localStorage.setItem("token",JSON.stringify(result.auth));
           navigate('/')
        }else{
            alert("User not found!")
        }
    }
    return(
        <div className='login'>
            
             <input type='text' className='inputBox' placeholder='Enter Email' onChange={(e)=>setEmail(e.target.value)} value={email}/>
             <input type='password' className='inputBox' placeholder='Enter your password' onChange={(e)=>setPassword(e.target.value)} value={password}/>
             <button className='appButton' type='button' onClick={handleLogin}>Login Up</button>
        </div>
    )
}
export default  Login;
