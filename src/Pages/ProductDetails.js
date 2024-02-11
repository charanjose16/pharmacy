import React, { useState } from 'react'
import Header from "../Components/Header";
import './ProductDetails.css'
import 'bootstrap/dist/css/bootstrap.css';
import { useLocation } from 'react-router-dom';

const ProductDetails = () => {
    const [addQuantity,setAddQuantity]=useState(1);
    const add=()=>{ 
      setAddQuantity(prevQuantity=>prevQuantity+1);
    }
    const sub=()=>{
        setAddQuantity(prevQuantity=>(prevQuantity > 1 ?prevQuantity-1 : 1));
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
                 <div class="input-group quant">
                  <span class="input-group-text" onClick={sub} style={{cursor:'pointer'}}>-</span>
                  <input type="text" class="form-control" value={addQuantity} />
                  <span class="input-group-text" onClick={add} style={{cursor:'pointer'}}>+</span>
                </div>
                <div className='prod-add-cart'><h5 className='prod-add-cart-text'>Add to Cart</h5></div>   
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