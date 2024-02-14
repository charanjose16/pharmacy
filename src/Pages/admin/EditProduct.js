import React, { useState } from 'react'
import "./EditProduct.css"
import { useLocation } from 'react-router-dom'
import { db } from '../../firebase-config'
import { updateDoc,doc } from 'firebase/firestore'
import AdminHeader from '../../Components/AdminHeader'

const EditProduct = () => {
    const [newTextInput,setNewTextInput]=useState("")
    const [newNumberInput,setNewNumberInput]=useState(0);

    const newInputText=(e)=>{
        setNewTextInput(e.target.value);
        return (<input type="text" value={newTextInput}/>)
    }

    const newInputNumber=(e)=>{
        setNewNumberInput(e.target.value);
        return (<input type="text" value={newNumberInput}/>)
    }

    const location=useLocation();
    const {productId,colName}=location.state || {};
    console.log(colName)
    
    const updateTextDet=async(id,id_field)=>{
        const ref=doc(db,colName,id);
        const newChange ={[id_field]: newTextInput };
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
        <div className='upd-prod-change'><h4>Name : </h4><input className="upd-pro-inp" type='text' defaultValue={productId.name} onChange={newInputText}></input><button onClick={()=>{updateTextDet(productId,'name')}} className='btn btn-primary upd-pro-change-button' >change</button></div>
        <div className='upd-prod-change'><h4>Image : </h4><input type='text' className="upd-pro-inp" defaultValue={productId.image}></input><button className='btn btn-primary upd-pro-change-button'>change</button></div>
        <div className='upd-prod-change'><h4>Old Price : </h4><input type='text' className="upd-pro-inp" defaultValue={productId.old_price}></input><button className='btn btn-primary upd-pro-change-button old-pric-change'>change</button></div>
    </div>

     </div>
  )
}

export default EditProduct