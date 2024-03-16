import React, { useState } from 'react'
import "./MyCart.css"
import Header from '../Components/Header'
import { ref, uploadBytes } from "firebase/storage"
import { imageDB } from '../firebase-config'
import {v4} from "uuid";
import { event } from 'jquery';

const Prescription = () => {

    const [img,setImg]= useState(null)
    const uploadImg=()=>{
        const imageRef = ref(imageDB,`images/${v4()}`)
        uploadBytes(imageRef,img)
        .then(() => {
            alert("Image uploaded successfully");
            setImg(null);
        })
        .catch(error => {
            console.error("Error uploading image:", error);
            alert("Error uploading image");
        });
    }

  return (
    <div>
       {/* css file in my cart */}
       <Header></Header>
       <div className='my-presc'>
        <h4>My Prescription</h4>
       </div>
     <div className='pres-main-div'> 
     <label className='file-upl'>
        <input  type='file' onChange={(e)=>setImg(e.target.files[0])}></input></label>
        <button className='upload-btn' onClick={uploadImg}>Upload</button>
     </div>

    </div>
  )
}

export default Prescription