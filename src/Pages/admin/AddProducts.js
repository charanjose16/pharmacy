import React, { useState } from 'react'
import "./AddProducts.css"
import AdminHeader from '../../Components/AdminHeader';
import { db } from '../../firebase-config';
import { collection,addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';


const AddProducts = () => {

    const navigate=useNavigate();
const[category,setCategory]=useState("select");
const[collectionName,setCollectionName]=useState("deals")
const [name,setName]=useState("")
const [imageUrl,setImageUrl]=useState("")
const [oldPrice,setOldPrice]=useState(0)
const [discount,setDiscount]=useState(0)
const [quantity,setQuantity]=useState(0)
const [desc1,setDesc1]=useState("")
const [desc2,setDesc2]=useState("")
const [desc3,setDesc3]=useState("")
const [desc4,setDesc4]=useState("")
const collectionRef = collection(db,collectionName);


const addProduct=async()=>{
    await addDoc(collectionRef,{name:name,image:imageUrl,old_price:Number(oldPrice),discount:Number(discount),quantity:Number(quantity),det_1:desc1,det_2:desc2,det_3:desc3,det_4:desc4});
    navigate("/adminProducts")
}



  return (
    <div>
    <AdminHeader></AdminHeader>
   
  
     <div className='add-prod-main-div'>


        <div className='add-prod-sep-div' style={{marginRight:"52px"}}><h4>Select category : </h4>
<div className='dropdown add-prod-sep-div'><div><h5>{category}</h5></div>
<div className='dropdown-toggle' data-mdb-toggle="dropdown" aria-expanded="false"  id="dropdownMenuButton">
</div>
<ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
    <li><h6 class="dropdown-item add-prod" onClick={()=>{setCategory("Best Deals"); setCollectionName("deals");}}>Best Deals</h6></li>
    <li><h6 class="dropdown-item add-prod" onClick={()=>{setCategory("Supplements"); setCollectionName("supplements"); }}>Supplements</h6></li>
    <li><h6 class="dropdown-item add-prod" onClick={()=>{setCategory("Ayurveda and Herbs")}}>Ayurveda and Herbs</h6></li>
    <li><h6 class="dropdown-item add-prod" onClick={()=>{setCategory("Health Food and Drink")}}>Health Food and Drink</h6></li>
    <li><h6 class="dropdown-item add-prod" onClick={()=>{setCategory("Fitness")}}>Fitness</h6></li>
    <li><h6 class="dropdown-item add-prod" onClick={()=>{setCategory("Wellness")}}>Wellness</h6></li>
  </ul>
 
 

</div></div>

<div className='add-prod-sep-div'><h4 style={{marginLeft:"52px"}}>Name : </h4><input type='text' className='add-prod-inp' onChange={(e)=>setName(e.target.value)}></input></div>
<div className='add-prod-sep-div' ><h4>Image URL : </h4><input type='text' className='add-prod-inp' onChange={(e)=>setImageUrl(e.target.value)}></input></div>
<div className='add-prod-sep-div'><h4 style={{marginLeft:"21px"}}>Old Price : </h4><input type='text' className='add-prod-inp' onChange={(e)=>setOldPrice(e.target.value)}></input></div>
<div className='add-prod-sep-div'><h4 style={{marginLeft:"23px"}}>Discount : </h4><input type='text' className='add-prod-inp' onChange={(e)=>setDiscount(e.target.value)}></input></div>
<div className='add-prod-sep-div'><h4 style={{marginLeft:"23px"}}>Quantity : </h4><input type='text' className='add-prod-inp' onChange={(e)=>setQuantity(e.target.value)}></input></div>
<div className='add-prod-sep-div'><h4 >Description 1 : </h4><textarea type='text' className='add-prod-inp' rows="4" style={{marginRight:"22px"}} onChange={(e)=>setDesc1(e.target.value)}></textarea></div>
<div className='add-prod-sep-div'><h4 >Description 2 : </h4><textarea type='text' className='add-prod-inp' rows="4" style={{marginRight:"22px"}} onChange={(e)=>setDesc2(e.target.value)}></textarea></div>
<div className='add-prod-sep-div'><h4 >Description 3 : </h4><textarea type='text' className='add-prod-inp' rows="4" style={{marginRight:"22px"}} onChange={(e)=>setDesc3(e.target.value)}></textarea></div>
<div className='add-prod-sep-div'><h4 >Description 4 : </h4><textarea type='text' className='add-prod-inp' rows="4" style={{marginRight:"22px"}} onChange={(e)=>setDesc4(e.target.value)}></textarea></div>







     </div>

     <button className='btn btn-success  add-pro' onClick={addProduct}>Add Product</button>



    </div>
  )
}

export default AddProducts