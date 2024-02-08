import React, { useState } from 'react'
import Header from "../Components/Header";
import './ProductDetails.css'
import 'bootstrap/dist/css/bootstrap.css';

const ProductDetails = () => {
    const [addQuantity,setAddQuantity]=useState(1);
    const add=()=>{ 
      setAddQuantity(prevQuantity=>prevQuantity+1);
    }
    const sub=()=>{
        setAddQuantity(prevQuantity=>(prevQuantity > 1 ?prevQuantity-1 : 1));
    }
     return (
    <div>
        <Header></Header>

        <div className='product-main-grid'>
            <div className='prod-items img'>
                <img className='prod-image' src="https://img7.hkrtcdn.com/27461/prd_2746056-MB-Fuel-One-Whey-Protein-Immunity-4.4-lb-Chocolate_o.jpg" width="400" height="400"/>
            </div>
            <div className='prod-items'>
                <h3>MB Fuel One Whey Protein, 2 kg (4.4 lb), Chocolate</h3>  
                <p className='prod-old-price'>MRP: Rs.5,099</p>
                <div className='prod-price-dis'>
                <h5 >Price: <span className='prod-price'>Rs.3,699</span></h5> 
                <p className='prod-dis'>27% off</p>
                </div>
                 <div className='prod-quant'>
                 <div class="input-group quant">
                  <span class="input-group-text" onClick={sub}>-</span>
                  <input type="text" class="form-control" value={addQuantity} />
                  <span class="input-group-text" onClick={add}>+</span>
                </div>
                <div className='prod-add-cart'><h5 className='prod-add-cart-text'>Add to Cart</h5></div>   
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProductDetails