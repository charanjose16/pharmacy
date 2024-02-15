import React, { useEffect, useState } from 'react'
import "./AdminProducts.css"
import AdminHeader from "../../Components/AdminHeader";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { collection,getDocs } from 'firebase/firestore';
import { db } from "../../firebase-config";
import { useNavigate } from 'react-router-dom';
import AddSearchHeader from '../../Components/AddSearchHeader';

const AdminProducts = () => {

const [deals,setDeals]=useState([]);
const [supplements,setSupplements]=useState([]);
const dealsCollectionRef=collection(db,"deals");
const supplementsCollectionRef=collection(db,"supplements");
const navigate=useNavigate();

const viewAll=(collName)=>{
  navigate("/allProducts",{state:{products:collName}})
}

useEffect(()=>{
  const getDealsData=async()=>{
    const res=await getDocs(dealsCollectionRef);
    setDeals(res.docs.map((doc)=>({...doc.data(),name:doc.data().name,image:doc.data().image,old_price:doc.data().old_price,discount:doc.data().discount,quantity:doc.data().quantity,id:doc.id})))
  }
  getDealsData();
},[])
useEffect(()=>{
  const getSupplementsData=async()=>{
    const res=await getDocs(supplementsCollectionRef);
    setSupplements(res.docs.map((doc)=>({...doc.data(),name:doc.data().name,image:doc.data().image,old_price:doc.data().old_price,discount:doc.data().discount,quantity:doc.data().quantity,id:doc.id})))
  }
  getSupplementsData();
},[])

const editPage=(deal,coll_name)=>{
  navigate("/editProduct",{state: {productId:deal,colName:coll_name}})
}

const discountPrice=(old_price,discount)=>{
  return (old_price-(old_price*discount)/100).toFixed(0);
}


  return (
    <div>
    <AdminHeader></AdminHeader>
     <AddSearchHeader></AddSearchHeader>

    <div className='prodcard-all'>
   
      <div className='prodcard-head-viewall'><h3>Deals</h3> <h5 className='prodcard-viwal' onClick={()=>{viewAll("deals")}}>View all</h5> </div>
      
      <div  className='product-card-container'>
      {deals.slice(0,3).map((deal)=>(
        <div className='prod-card-grid-items'>
        <div className='admin-prod-card-img-quan '>
        <img src={deal.image} width="140" height="140" style={{objectFit:"contain"}} alt=''></img>
        <h6>Quantity Remaining: {deal.quantity}</h6> 
        </div>
        <h6 className='prodcard-prod-name'>{deal.name}</h6>
        <div className='prodcard-mrp-dis'>
        <p className='product-card-mrp'>MRP.{deal.old_price}</p>
        <p>Discount: <span className='prodcard-dis'>{deal.discount}% off</span> </p>
        </div>
        <p>Price: <span className='prodcard-pri'>Rs. {discountPrice(deal.old_price,deal.discount)}</span></p>
        <div className='prod-card-edit-rem'>
        <button className='btn btn-dark remove-product' onClick={()=>{editPage(deal,"deals")}}>Edit</button>
        <button className='btn btn-danger remove-product'>Remove Product</button>
        </div>
        </div>
        ))}
      </div>


      <div className='prodcard-head-viewall'><h3>Supplements</h3> <h5 className='prodcard-viwal' onClick={()=>{viewAll("supplements")}}>View all</h5> </div>
      
      <div  className='product-card-container'>
      {supplements.slice(0,3).map((deal)=>(
        <div className='prod-card-grid-items'>
        <div className='admin-prod-card-img-quan '>
        <img src={deal.image} width="140" height="140" style={{objectFit:"contain"}} alt=''></img>
        <h6>Quantity Remaining: {deal.quantity}</h6> 
        </div>
        <h6 className='prodcard-prod-name'>{deal.name}</h6>
        <div className='prodcard-mrp-dis'>
        <p className='product-card-mrp'>MRP.{deal.old_price}</p>
        <p>Discount: <span className='prodcard-dis'>{deal.discount}% off</span> </p>
        </div>
        <p>Price: <span className='prodcard-pri'>Rs. {discountPrice(deal.old_price,deal.discount)}</span></p>
        <div className='prod-card-edit-rem'>
        <button className='btn btn-dark remove-product' onClick={()=>{editPage(deal,"supplements")}}>Edit</button>
        <button className='btn btn-danger remove-product'>Remove Product</button>
        </div>
        </div>
        ))}
      </div>
   
    </div>


    </div>
  )
}

export default AdminProducts