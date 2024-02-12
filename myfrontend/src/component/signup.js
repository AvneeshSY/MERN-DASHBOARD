import React,{useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
const Signup=()=>{
    const[name,setName]=useState("");
    const[password,setPassword]=useState("");
    const[email,setEmail]=useState("")
    const [errorMessage, setErrorMessage] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    // const navigate=useNavigate();
    const navigate =useNavigate();
    useEffect(()=>{
        const auth =localStorage.getItem('user');
        if(auth){
            navigate('/')
        }
    })

    const collectData=async()=>{
        console.log(name,email,password);
        let result= await fetch('http://localhost:8080/register',{
            method:"post",
            body:JSON.stringify({name,email,password}),
            headers:{
                'Content-Type':'application/json'
            },
        });
        result =await result.json()
        if (result.error) {
            // Email already exists, show error message
            setErrorMessage(result.error);
            setShowPopup(true);
            // Optionally, you can reset the email field
            setEmail("");
        } else {
            // Registration successful, clear error message
            setErrorMessage("");
        }

        console.log(result);
         
          localStorage.setItem("user",JSON.stringify(result.result))
          
          localStorage.setItem("token",JSON.stringify(result.auth))
            navigate('/');
        
    };
    const closePopup = () => {
        setShowPopup(false);};
            return(
        <div className='register'>
            <h1>Register</h1>
          
            <input className='inputBox' type='text' value={name} onChange={(e)=>setName(e.target.value)} placeholder='Enter Name' required/>
            <input  type='Email' className='inputBox' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter Email' required/>
            {errorMessage && <p>{errorMessage}</p>}
            <input className='inputBox' type='password' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Enter Password' required/>
            <button onClick={collectData} type='button'>Sign up</button>
            
        </div>
    )
}
export default Signup;