import React, { useState } from 'react'
import "./Login.css"
import { signInWithEmailAndPassword } from 'firebase/auth';
import {auth} from '../firebase-config';
import {Link, useNavigate } from 'react-router-dom';



const Login = () => {
  const [userEmail,setUserEmail]=useState('');
  const [userPassword,setUserPassword]=useState('');
const navigate = useNavigate();
  const createAcc =()=>{
    navigate('/SignUp')
  }

  const forgetPw=()=>{
    navigate('/forgetpw')
  }

  const login=async()=>{
    try{
        await signInWithEmailAndPassword(auth,userEmail,userPassword)
        navigate("/home")
    }
    catch(error){
        alert("Wrong Email or Password")
    }
       
  }

  return (
    <div className='login-main-div'>
    <div>
    <h1 className='login-font'>Login</h1>
    </div>
    
    <div className='login-inputs'>
        <input className='log-inp' type="email" placeholder='Enter your email'  onChange={(event)=>{
            setUserEmail(event.target.value)
          
        }}/>
        <input className='log-inp' placeholder='Enter your password' type="password" onChange={(event)=>{
            setUserPassword(event.target.value)
          
        }}/>
    </div>
   
    <div>
    
    <h5 onClick={forgetPw} className='forgetpw'>Forget Password?</h5>
  
    </div>
         
   
    <div className='log-sign'>
    <button className="login-button" onClick={login}>Login</button>
    <div className='hr-login'>
    <hr></hr>
    <div className='or'>or</div>
    <hr></hr>
    </div>
    
       <button className="signup-button" onClick={createAcc} >Sign Up</button>
    </div>
    

    </div>

   
    
  )
}

export default Login