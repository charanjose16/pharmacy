import React, { useState } from 'react'
import {sendPasswordResetEmail} from "firebase/auth"
import { auth } from '../firebase-config'
import {useNavigate} from "react-router-dom"
import "./ForgetPassword.css";

const ForgetPassword = () => {
const [email,setEmail]=useState("")
const navigate=useNavigate()

    const forget=async()=>{ 
        try{
        await sendPasswordResetEmail(auth,email)
        alert("Check your Mail")
        navigate("/")
        }
        catch(error){
            alert(error.message)
        }
           
    }


  return (
    <div className='login-main-div'>
    <div>
    <h1 className='login-font'>Forget Password</h1>
    </div>
         
    
    <div className='login-inputs col-2'>
        <input className='log-inp' type="email"  placeholder="Enter your email address"  onChange={(event)=>{
                   setEmail(event.target.value)
        }}/>
        <button onClick={forget} className='register-button'>Reset Password</button>
    </div>

   
    </div>
  )
}

export default ForgetPassword