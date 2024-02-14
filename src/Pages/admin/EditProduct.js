import React, { useEffect, useState } from 'react'
import "./EditProduct.css"
import { useLocation } from 'react-router-dom'
import { db } from '../../firebase-config'
import { updateDoc,doc } from 'firebase/firestore'
import AdminHeader from '../../Components/AdminHeader'

const EditProduct = () => {
    const [newTextInput,setNewTextInput]=useState("")
    const [newNumberInput,setNewNumberInput]=useState(0);


    const location=useLocation();
    const {productId,colName}=location.state || {};
    
    const updateTextDet=async(id,field,value)=>{
        const ref=doc(db,colName,id);
        const newChange = {[field]:value }
        await updateDoc(ref,newChange);
    }


  return (
    <div>
    <AdminHeader></AdminHeader>

    <div className='upd-pro-image-text'>
    <img src={productId.image} width="150" height="150" style={{objectFit:"contain"}}></img>
    <h5>{productId.name}</h5>
    </div>
    
    <div className='upd-prod-change-div'>
        <div className='upd-prod-change'><h4>Name : </h4><input className="upd-pro-inp" type='text' defaultValue={productId.name} onChange={(e)=>{setNewTextInput(e.target.value)}}></input><button onClick={()=>{updateTextDet(productId.id,'name',newTextInput)}} className='btn btn-primary upd-pro-change-button' >change</button></div>
        <div className='upd-prod-change'><h4>Image : </h4><input type='text' className="upd-pro-inp" defaultValue={productId.image} onChange={(e)=>{setNewTextInput(e.target.value)}}></input><button onClick={()=>{updateTextDet(productId.id,'image',newTextInput)}} className='btn btn-primary upd-pro-change-button'>change</button></div>
        <div className='upd-prod-change'><h4>Old Price : </h4><input type='text' className="upd-pro-inp" defaultValue={productId.old_price} onChange={(e)=>{setNewNumberInput(e.target.value)}}></input><button onClick={()=>{updateTextDet(productId.id,'old_price',newNumberInput)}} className='btn btn-primary upd-pro-change-button old-pric-change'>change</button></div>
    </div>

     </div>
  )
}

export default EditProduct