import React, { useState } from 'react'
import "./SignUp.css"
import {createUserWithEmailAndPassword} from "firebase/auth"
import {collection,addDoc} from "firebase/firestore"
import {auth,db} from "../firebase-config";
import { useNavigate } from 'react-router-dom';



const SignUp = () => {

    const navigate=useNavigate();

    const [userName,setUserName]=useState("");
    const [userEmail,setUserEmail]=useState("");
    const [userPassword,setUserPassword]=useState("");
    const [userNumber,setUserNumber]=useState("");
    const collectionRef = collection(db,"users");
    
    const register = async()=>{
        try{
            await createUserWithEmailAndPassword(auth,userEmail,userPassword)

            await addDoc(collectionRef,{name:userName,email:userEmail,phone:userNumber})
            navigate('/login')   
        }
        catch(error){
            alert(error.message);
        }
        
    }
   
  return (
    <div className='login-main-div'>
    <div>
    <h1 className='login-font'>Sign Up</h1>
    </div>
    <div className='login-inputs col-2'>
        <input className='log-inp ' placeholder='Enter your name' type='text' onChange={(event)=>{
                setUserName(event.target.value)
        }}></input>
        <input className='log-inp' placeholder='Enter your email' type='email'
        onChange={(event)=>{
                setUserEmail(event.target.value)
        }}></input>
        <input className='log-inp' placeholder='Enter your password' type='password' onChange={(event)=>{
                setUserPassword(event.target.value)
        }}></input>
        <input  className='log-inp'placeholder='Enter your phone number' type="tel" onChange={(event)=>{
                setUserNumber(event.target.value)
        }}></input>
        <button onClick={()=>register()} className="register-button">Register</button>
    </div>
    <div className='alr-us'>
        <h6 className='already-user'>already a user?<span ><a className='alr-user-span' href="/"> Login</a></span></h6>
    </div>
    
    </div>
  )
}

export default SignUp