import React, { useState } from 'react'
import Header from "../Components/Header";
import './ProductDetails.css'
import 'bootstrap/dist/css/bootstrap.css';
import { useLocation,useNavigate } from 'react-router-dom';
import { db } from '../firebase-config';
import { addDoc,collection } from 'firebase/firestore';

const ProductDetails = () => {
  const navigate=useNavigate();
    const [addQuantity,setAddQuantity]=useState(1);
    const add=()=>{ 
      setAddQuantity(prevQuantity=>prevQuantity+1);
    }
    const sub=()=>{
        setAddQuantity(prevQuantity=>(prevQuantity > 1 ?prevQuantity-1 : 1));
    }

    const [selectedDeal, setSelectedDeal] = useState(null);

  const handleFavouriteClick = (deal) => {
    setSelectedDeal(deal);
  };

  const addToWishlist=async(prodData)=>{
    const collecRef=collection(db,"cart");
    await addDoc(collecRef,{name:prodData.name,image:prodData.image,old_price:prodData.old_price,discount:prodData.discount,quantity:prodData.quantity,det_1:prodData.det_1,det_2:prodData.det_2,det_3:prodData.det_3,det_4:prodData.det_4})
  
  }

  const addCart=async(data)=>{
    const collectionRef=collection(db,"myCart");
     await addDoc(collectionRef,{name:data.name,image:data.image,old_price:data.old_price,discount:data.discount,quantity:data.quantity,det_1:data.det_1,det_2:data.det_2,det_3:data.det_3,det_4:data.det_4})
     alert("Added to Cart Successfully!");
 }
    
    const location=useLocation();
    const {productDet} =location.state || {};
    const discountPrice=(productDet.old_price-(productDet.old_price*productDet.discount)/100).toFixed(0);

     return (
    <div>
        <Header></Header>

        <div className='product-main-grid'>
            <div className='prod-items img'>
                <img className='prod-image' src={productDet.image} width="400" height="400" style={{objectFit:'contain'}}/>
                <div className='fav-star'>
    <div className={`click ${selectedDeal === productDet ? 'active active-2 active-3' : ''}`} onClick={() => {handleFavouriteClick(productDet); addToWishlist(productDet)}}>
                  <span className={`fa ${selectedDeal === productDet ? 'fa-star' : 'fa-star-o'}`}></span>
                  <div className="ring"></div>
                  <div className="ring2"></div>
    </div>
    </div> 
            </div>
            <div className='prod-items'>
                <h3>{productDet.name}</h3>  
                <p className='prod-old-price'>Rs.{productDet.old_price}</p>
                <div className='prod-price-dis'>
                <h5 >Price:  <span className='prod-price'>Rs.{discountPrice}</span></h5> 
                <p className='prod-dis'>{productDet.discount}% off</p>
                </div>
                
                
                <div  className='spl-offer-main'>
                    <div className='spl-bajaj'>
                           <div><img src='https://companieslogo.com/img/orig/BAJAJFINSV.NS-69a58fe4.png?t=1596838048' width="50" height="50" style={{marginLeft:'10px'}}/></div>
                           <div><p>Get Flat 10% Cashback upto 400 on Healthkart via Bajaj Pay wallet </p></div>
                    </div>
                    <div className='spl-airtel'>
                    <div><img src='   https://zeevector.com/wp-content/uploads/Airtel-Payment-Bank-Logo@zeevector.png' width="50" height="60" style={{marginLeft:'10px'}}/></div>
                           <div><p>Flat Rs.200 Cashback On Min. Order Of Rs.2000 For First Time Users Of Airtel Payments Bank On HealthKart. Offer Valid Till 29th Feb 2024 </p></div>
                 
                    </div>
                </div>

                <div className='prod-quant'>
        
                 <div className='prod-add-cart buy-now' onClick={()=>{navigate("/buyNow",{state:{prod:productDet}})}}><h5 className='prod-add-cart-text'>Buy Now</h5></div>
               
                <div className='prod-add-cart' onClick={()=>{addCart(productDet)}}><h5 className='prod-add-cart-text'>Add to Cart</h5></div>   
                </div>

            </div>
        </div>

        <h4>Product Details</h4>
        <div className='prod-des-div'>
            <p className='prod-des-p'>• {productDet.det_1}</p>
            <p className='prod-des-p'>• {productDet.det_2}</p>
            <p className='prod-des-p'>• {productDet.det_3}</p>
            <p className='prod-des-p'>• {productDet.det_4}</p>
        </div>
    </div>
  )
}

export default ProductDetails