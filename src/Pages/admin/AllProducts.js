import React, { useEffect, useState } from 'react'
import { useLocation ,useNavigate} from 'react-router-dom';
import { db } from '../../firebase-config';
import { collection,getDocs } from 'firebase/firestore';
import AdminHeader from '../../Components/AdminHeader';
import AddSearchHeader from '../../Components/AddSearchHeader';

const AllProducts = () => {
    
    const navigate=useNavigate();
    const[Product,setProduct]=useState([]);
const location=useLocation();
const {products}=location.state;

const collectionRef=collection(db,products); 

useEffect(()=>{
    const getProductData=async()=>{
      const res=await getDocs(collectionRef);
      setProduct(res.docs.map((doc)=>({...doc.data(),name:doc.data().name,image:doc.data().image,old_price:doc.data().old_price,discount:doc.data().discount,quantity:doc.data().quantity,id:doc.id})))
    }
    getProductData()
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
    <div className='prodcard-head-viewall'><h3 style={{textTransform:"capitalize"}}>{products}</h3> </div>
<div  className='product-card-container'>
      {Product.map((deal)=>(
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
  
    </div>
  )
}

export default AllProducts