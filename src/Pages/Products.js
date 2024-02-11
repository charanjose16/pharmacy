import React, { useEffect, useState } from 'react'
import "./Products.css";
import Header from "../Components/Header"
import { useLocation ,useNavigate} from 'react-router-dom';
import { getDocs,collection } from 'firebase/firestore';
import {db} from "../firebase-config";


const Products = () => {
  const location = useLocation();
  const {collectionName}=location.state;
  const collectionRef=collection(db,collectionName);
  const [products,setProducts]=useState([]);
  const navigate=useNavigate();


  const productNavigate=(product)=>{
    navigate("/product",{state:{productDet:product}})
    }
    
  useEffect(()=>{
         const getProductData=async()=>{
          const res=await getDocs(collectionRef);
          setProducts(res.docs.map((doc)=>({...doc.data(),name:doc.data().name,image:doc.data().image,old_price:doc.data().old_price,discount:doc.data().discount})))
         }
         getProductData();
  },[collectionRef])

  const discountPrice=(old_price,discount)=>{
    return (old_price-(old_price*discount)/100).toFixed(0);
  }

 
  return (
    <div>
        <Header></Header>
        <div className='grid-container-deal' >
{products.map((product) => (

<div className='grid-items-deal' onClick={()=>productNavigate(product)}>




  <div className='deal-content'>
    <div className='cont-img-div'>
    <img className='deal-cont-pic' src={product.image} alt='img'></img>
    </div>
    
    <p className='deal-cont-p'>{product.name}</p>
    <div className='discount-div-deals'>
    <h6 className='deal-old-price'>Rs.{product.old_price}</h6>
    <h5>Rs.{discountPrice(product.old_price,product.discount)}</h5>
    <h6 className='deal-discount'>{product.discount}% off</h6>
    </div>
    <div className='deal-add-to-cart'><h6 className='ad-cart'>Add to Cart</h6></div>
  
  </div>

</div>
))}

</div>
    </div>
  )
}

export default Products