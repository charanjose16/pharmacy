import React, { useEffect, useState } from 'react'
import "./HomePage.css";
import banner1 from "../assets/banner1.jpg";
import banner2 from "../assets/banner2.jpg";
import banner3 from "../assets/banner3.jpg";
import {collection,getDocs,addDoc} from "firebase/firestore"
import { useNavigate } from 'react-router-dom';
import { db ,auth} from "../firebase-config"
import Header from '../Components/Header';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import "bootstrap/js/dist/carousel"
import 'font-awesome/css/font-awesome.min.css';




const HomePage = () => {
  const navigate=useNavigate();
const[deals,setDeals]=useState([]);
const[supplements,setSupplements]=useState([])
const dealsCollectionRef=collection(db,"deals");
const supplementsCollectionRef=collection(db,"supplements");


const [selectedDeal, setSelectedDeal] = useState(null);

  const handleFavouriteClick = (deal) => {
    setSelectedDeal(deal);
  };
const productNavigate=(deal)=>{
navigate("/product",{state:{productDet:deal}})
}

const userID=auth.currentUser;

const addToWishlist=async(prodData)=>{
  const userID = auth.currentUser? auth.currentUser.uid:null;
  const collecRef=collection(db,"cart");
  await addDoc(collecRef,{name:prodData.name,image:prodData.image,old_price:prodData.old_price,discount:prodData.discount,quantity:prodData.quantity,det_1:prodData.det_1,det_2:prodData.det_2,det_3:prodData.det_3,det_4:prodData.det_4,userID:userID})

}

const dealProducts=(collectionDataName)=>{
  navigate("/productsList",{state:{collectionName:collectionDataName}});
}
useEffect(()=>{
  console.log("useEffect in");
  const getDealsData = async ()=>{
    const res = await getDocs(dealsCollectionRef);
    setDeals(res.docs.map((doc)=>({...doc.data(),name:doc.data().name,image:doc.data().image,old_price:doc.data().old_price,discount:doc.data().discount,id:doc.id})))
  };
  getDealsData();
  console.log("useEffect out");
},[]);
useEffect(()=>{
  console.log("useEffect in");
  const getDealsData = async ()=>{
    const res = await getDocs(supplementsCollectionRef);
    setSupplements(res.docs.map((doc)=>({...doc.data(),name:doc.data().name,image:doc.data().image,old_price:doc.data().old_price,discount:doc.data().discount,id:doc.id})))
  };
  getDealsData();
  console.log("useEffect out");
},[]);


const addCart=async(data)=>{
  const userID = auth.currentUser? auth.currentUser.uid:null;
   const collectionRef=collection(db,"myCart");
    await addDoc(collectionRef,{name:data.name,image:data.image,old_price:data.old_price,discount:data.discount,quantity:data.quantity,det_1:data.det_1,det_2:data.det_2,det_3:data.det_3,det_4:data.det_4,prod_count:1,userID:userID})
    alert("Added to Cart Successfully!");
}

const discountPrice=(old_price,discount)=>{
  return (old_price-(old_price*discount)/100).toFixed(0);
}

  return (

    <div className='main-div'>
    
    <Header></Header>

{/* courousel div */}

<div className='coro-div'>

    <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
  <ol className="carousel-indicators">
    <li data-target="#carouselExampleIndicators"  className="active"></li>
    <li data-target="#carouselExampleIndicators"  ></li>
    <li data-target="#carouselExampleIndicators" ></li>
  </ol>
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img className="d-block w-100" src={banner2} alt="First slide"/>
    </div>
    <div className="carousel-item">
      <img className="d-block w-100" src={banner1} alt="Second slide"/>
    </div>
    <div className="carousel-item">
      <img className="d-block w-100" src={banner3} alt="Third slide"/>
    </div>
  </div>
  <a className="carousel-control-prev" data-bs-target="#carouselExampleIndicators" role="button" data-slide="prev" >
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    
  </a>
  <a className="carousel-control-next" data-bs-target="#carouselExampleIndicators" role="button" data-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    
  </a>
</div>

</div>




<div className='bestdeal-text'>
<h3>Best Deals</h3>
<h5 className='view-all-deals' style={{color:"#12ca7b",fontSize:17}} onClick={()=>dealProducts("deals")} >View all</h5>
</div>

<div className='grid-container-deal' >
{deals.slice(0, 4).map((deal) => (

<div className='grid-items-deal'>




  <div className='deal-content'>
    <div className='cont-img-div'>
    <img className='deal-cont-pic' alt="" src={deal.image}  onClick={()=>productNavigate(deal)}></img>

    <div className='fav-star'>
    <div className={`click ${selectedDeal === deal ? 'active active-2 active-3' : ''}`} onClick={() => {handleFavouriteClick(deal); addToWishlist(deal)}}>
                  <span className={`fa ${selectedDeal === deal ? 'fa-star' : 'fa-star-o'}`}></span>
                  <div className="ring"></div>
                  <div className="ring2"></div>
    </div>
    </div>

              </div>
    
    <p className='deal-cont-p'>{deal.name}</p>
    <div className='discount-div-deals'>
    <h6 className='deal-old-price'>Rs.{deal.old_price}</h6>
    <h5>Rs.{discountPrice(deal.old_price,deal.discount)}</h5>
    <h6 className='deal-discount'>{deal.discount}% off</h6>
    </div>
    <div className='deal-add-to-cart' onClick={()=>{addCart(deal)}}><h6 className='ad-cart'>Add to Cart</h6></div>
  
  </div>

</div>
))}

</div>


<div className='bestdeal-text supps'>
<h3>Supplements</h3>
<h5 className='view-all-deals' style={{color:"#12ca7b",fontSize:17}} onClick={()=>dealProducts("supplements")} >View all</h5>
</div>

<div className='grid-container-deal' >
{supplements.slice(0, 4).map((deal) => (

<div className='grid-items-deal'>




  <div className='deal-content'>
    <div className='cont-img-div'>
    <img className='deal-cont-pic' alt="" src={deal.image}  onClick={()=>productNavigate(deal)}></img>
 <div className='fav-star'>
    <div className={`click ${selectedDeal === deal ? 'active active-2 active-3' : ''}`} onClick={() => {handleFavouriteClick(deal); addToWishlist(deal)}}>
                  <span className={`fa ${selectedDeal === deal ? 'fa-star' : 'fa-star-o'}`}></span>
                  <div className="ring"></div>
                  <div className="ring2"></div>
    </div>
    </div>
    </div>
    
    <p className='deal-cont-p'>{deal.name}</p>
    <div className='discount-div-deals'>
    <h6 className='deal-old-price'>Rs.{deal.old_price}</h6>
    <h5>Rs.{discountPrice(deal.old_price,deal.discount)}</h5>
    <h6 className='deal-discount'>{deal.discount}% off</h6>
    </div>
    <div className='deal-add-to-cart' onClick={()=>{addCart(deal)}}><h6 className='ad-cart'>Add to Cart</h6></div>
  
  </div>

</div>
))}

</div>

    
    </div>
  )
}

export default HomePage