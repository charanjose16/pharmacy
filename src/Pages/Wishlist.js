import React, { useEffect, useState } from 'react'
import "./Wishlist.css";
import Header from "../Components/Header"
import { useNavigate} from 'react-router-dom';
import { getDocs,collection,deleteDoc,doc } from 'firebase/firestore';
import {db} from "../firebase-config";


const Wishlist = () => {


  const collectionRef=collection(db,"cart");
  const [products,setProducts]=useState([]);
  const navigate=useNavigate();



  const productNavigate=(product)=>{
    navigate("/product",{state:{productDet:product}})
    }
    


  useEffect(()=>{
    console.log("useEffect in");
         const getProductData=async()=>{
          const res=await getDocs(collectionRef);
          setProducts(res.docs.map((doc)=>({...doc.data(),name:doc.data().name,image:doc.data().image,old_price:doc.data().old_price,discount:doc.data().discount,id:doc.id})))
         }
         getProductData();
         console.log("useEffect out");
  },[])

  const discountPrice=(old_price,discount)=>{
    return (old_price-(old_price*discount)/100).toFixed(0);
  }

  const deleteProduct=async(id)=>{
    const prodId=doc(db,"cart",id)
    await deleteDoc(prodId);
    window.location.reload();
  }
 
  return (
    <div>
        <Header></Header>
        <h3 className='prod-head'>My Wishlist :</h3>
        <div className='grid-container-deal' >
      
{products.map((product) => (

<div className='grid-items-deal' >




  <div className='deal-content'>
    <div className='cont-img-div'>
    <img className='deal-cont-pic' src={product.image} alt='img' onClick={()=>productNavigate(product)}></img>
   <div className='fav-bin' onClick={()=>{deleteProduct(product.id)}}> <img src='https://icons.veryicon.com/png/o/education-technology/plush-three-year-old-icon-gallery/delete-88.png' width="25" height="25"></img></div>   
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

export default Wishlist