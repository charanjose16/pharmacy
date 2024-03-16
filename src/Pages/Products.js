import React, { useEffect, useState } from 'react'
import "./Products.css";
import Header from "../Components/Header"
import { useLocation ,useNavigate} from 'react-router-dom';
import { getDocs,collection,addDoc } from 'firebase/firestore';
import {db,auth} from "../firebase-config";



const Products = () => {
  const location = useLocation();
  const {collectionName}=location.state;
  const collectionRef=collection(db,collectionName);
  const [products,setProducts]=useState([]);
  const navigate=useNavigate();

  const userID = auth.currentUser; 
  console.log(userID ? userID.uid : "No user logged in");

  const [selectedDeal, setSelectedDeal] = useState(null);

  const handleFavouriteClick = (deal) => {
    setSelectedDeal(deal);
  };

  const productNavigate=(product)=>{
    navigate("/product",{state:{productDet:product}})
    }
    
    const addToWishlist=async(prodData)=>{
      const userID = auth.currentUser ? auth.currentUser.uid : null;
      const collecRef=collection(db,"cart");
      await addDoc(collecRef,{name:prodData.name,image:prodData.image,old_price:prodData.old_price,discount:prodData.discount,quantity:prodData.quantity,det_1:prodData.det_1,det_2:prodData.det_2,det_3:prodData.det_3,det_4:prodData.det_4,userID:userID})
    
    }

    const addCart=async(data)=>{
      const userID = auth.currentUser ? auth.currentUser.uid : null;
      const collectionRef=collection(db,"myCart");
       await addDoc(collectionRef,{name:data.name,image:data.image,old_price:data.old_price,discount:data.discount,quantity:data.quantity,det_1:data.det_1,det_2:data.det_2,det_3:data.det_3,det_4:data.det_4,prod_count:1,userID:userID})
       alert("Added to Cart Successfully!");
   }

  useEffect(()=>{
    console.log("useEffect in");
         const getProductData=async()=>{
          const res=await getDocs(collectionRef);
          setProducts(res.docs.map((doc)=>({...doc.data(),name:doc.data().name,image:doc.data().image,old_price:doc.data().old_price,discount:doc.data().discount})))
         }
         getProductData();
         console.log("useEffect out");
  },[collectionName])

  const discountPrice=(old_price,discount)=>{
    return (old_price-(old_price*discount)/100).toFixed(0);
  }

 
  return (
    <div>
        <Header></Header>
        <h3 className='prod-head'>{collectionName}:</h3>
        <div className='grid-container-deal' >
      
{products.map((product) => (

<div className='grid-items-deal' >




  <div className='deal-content'>
    <div className='cont-img-div'>
    <img className='deal-cont-pic' src={product.image} alt='img' onClick={()=>productNavigate(product)}></img>
   <div className='fav-star'>
    <div className={`click ${selectedDeal === product ? 'active active-2 active-3' : ''}`} onClick={() => {handleFavouriteClick(product); addToWishlist(product)}}>
                  <span className={`fa ${selectedDeal === product ? 'fa-star' : 'fa-star-o'}`}></span>
                  <div className="ring"></div>
                  <div className="ring2"></div>
    </div>
    </div>    </div>
    
    <p className='deal-cont-p'>{product.name}</p>
    <div className='discount-div-deals'>
    <h6 className='deal-old-price'>Rs.{product.old_price}</h6>
    <h5>Rs.{discountPrice(product.old_price,product.discount)}</h5>
    <h6 className='deal-discount'>{product.discount}% off</h6>
    </div>
    <div className='deal-add-to-cart' onClick={()=>{addCart(product)}}><h6 className='ad-cart'>Add to Cart</h6></div>
  
  </div>

</div>
))}

</div>
    </div>
  )
}

export default Products