import React, { useState } from 'react'
import "./SignUp.css"
import {createUserWithEmailAndPassword} from "firebase/auth"
import {collection,addDoc} from "firebase/firestore"
import {auth,db} from "../firebase-config";
import { useNavigate } from 'react-router-dom';




const SignUp = () => {
    <script>
      $(".alert").alert();
    </script>

    const navigate=useNavigate();

    const [userName,setUserName]=useState("");
    const [userEmail,setUserEmail]=useState("");
    const [userPassword,setUserPassword]=useState("");
    const [userNumber,setUserNumber]=useState("");
    const collectionRef = collection(db,"users");
    

    const isValidPhoneNumber = (phoneNumber) => {
        // You can customize this validation based on your specific requirements
        const phoneRegex = /^\d{10}$/; // Assumes a 10-digit phone number
        return phoneRegex.test(phoneNumber);
      };


    const register = async () => {
        try {
          if (userName === "" || userEmail === "" || userPassword === "" || userNumber === "") {
            alert("Please fill out all fields");
          } else {
            // Additional signup validations
            if (userPassword.length < 6) {
              alert("Password is too short, at least 6 characters required");
              return;
            }
    
            // Validate mobile number
            if (!isValidPhoneNumber(userNumber)) {
              alert("Enter a valid 10-digit mobile number");
              return;
            }
    

            const authResult = await createUserWithEmailAndPassword(auth, userEmail, userPassword);
    
    
            await addDoc(collectionRef, { name: userName, email: userEmail, phone: userNumber, uid: authResult.user.uid });
    
            alert("Registration successful");
            navigate("/login");
           
          }
        } catch (error) {
        
          if (error.code === 'auth/email-already-in-use') {
            console.error('Email address is already in use.');
          } else if (error.code === "auth/weak-password") {
            alert("Password is too short, at least 6 characters required");
          } else if (error.code === 'auth/invalid-email') {
            alert("Enter valid Email address");
          } else if (error.code === 'auth/missing-password') {
            alert("Enter a password");
          } else {
            console.error(error);
          }
        }
      };
   
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
        <h6 className='already-user'>already a user?<span ><a className='alr-user-span' href="/login"> Login</a></span></h6>
    </div>
    
    </div>
  )
}

export default SignUp