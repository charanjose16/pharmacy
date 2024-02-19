import React, { useState } from 'react'
import "./BuyNow.css"
import { useLocation,useNavigate } from 'react-router-dom';
import { db } from '../firebase-config';
import { collection,addDoc} from 'firebase/firestore';

const BuyNow = () => {
    const location = useLocation()
    const {prod} = location.state;
    console.log(prod.name);
    const navigate=useNavigate();

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
         await addDoc(collectionRef,{name:data.name,image:data.image,old_price:data.old_price,discount:data.discount,quantity:data.quantity,det_1:data.det_1,det_2:data.det_2,det_3:data.det_3,det_4:data.det_4,prod_count:1})
         alert("Added to Cart Successfully!");
     }

    const discountPrice=(old_price,discount)=>{
        return (old_price-(old_price*discount)/100).toFixed(0);
      }
      const [quanValue,setQuanValue]=useState(1);

const add=()=>{
     setQuanValue(quanValue+1);
}

const sub=()=>{
    if(quanValue>1){
    setQuanValue(quanValue-1);
    }
}

  return (
    <div>
        <div className='grid-container-deal buy-now' >
      
      
      
      <div className='grid-items-buy-now' >
      
      
      
      
        <div className='deal-content'>
          <div className='cont-img-div'>
          <img className='deal-cont-pic' style={{cursor:'default'}} src={prod.image} alt='img'></img>
         <div className='fav-star'>
          <div className={`click ${selectedDeal === prod ? 'active active-2 active-3' : ''}`} onClick={() => {handleFavouriteClick(prod); addToWishlist(prod)}}>
                        <span className={`fa ${selectedDeal === prod ? 'fa-star' : 'fa-star-o'}`}></span>
                        <div className="ring"></div>
                        <div className="ring2"></div>
          </div>
          </div>    </div>
          
          <p className='deal-cont-p'>{prod.name}</p>


          <div class="input-group quant">
                  <span class="input-group-text" onClick={sub} style={{cursor:'pointer'}}>-</span>
                  <input type="text" class="form-control" value={quanValue}/>
                  <span class="input-group-text" onClick={add} style={{cursor:'pointer'}}>+</span>
     </div>

          <div className='discount-div-deals buy-now'>
          <h6 className='deal-old-price'>Rs.{prod.old_price}</h6>
          <h5>Rs.{discountPrice(prod.old_price,prod.discount)}</h5>
          <h6 className='deal-discount'>{prod.discount}% off</h6>
          </div>

        
        </div>
      
      </div>

      <div className='buy-now-price-quan-main'>
      <div className='buy-now-price-quan'>
        <h6>{prod.name}</h6>
        <h6>X{quanValue}</h6> =
        <h6 style={{color:"#12ca7b"}}> Rs. {discountPrice(prod.old_price,prod.discount)*quanValue}</h6>
        </div>
        <div>
        <div className='buy-now-checkout-div'>
   <div className='chekout-price-list buy-now'>
   <div className='price-topic'>
   <div className='list-topics'> 
   <p>Total Price </p>
    <p>Delivery Charge </p>
    <p>Other Tax </p>
    
    </div>
   <div className='list-prices'>
   <p style={{fontWeight:"500"}}> : Rs. {discountPrice(prod.old_price,prod.discount)*quanValue}</p>
    <p style={{fontWeight:"500"}}> : Rs. 40</p>
    <p style={{fontWeight:"500"}}> : Rs. 30</p>
   
   </div>
   </div>
   <hr></hr>
   <h5>Grand Total  - <span  style={{color:"#12ca7b"}}>Rs.{discountPrice(prod.old_price,prod.discount)*quanValue+70}</span></h5>
   
    <button className='btn buy-now-btn '>CHECKOUT</button>
   </div>
   </div>

        </div>
      </div>
     
      
      </div>
    </div>
  )
}

export default BuyNow