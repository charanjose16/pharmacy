import React, { useEffect, useState } from 'react'
import "./HomePage.css";
import banner1 from "../assets/banner1.jpg";
import banner2 from "../assets/banner2.jpg";
import banner3 from "../assets/banner3.jpg";
import {collection,getDocs} from "firebase/firestore"
import { useNavigate } from 'react-router-dom';
import { db } from "../firebase-config"



const HomePage = () => {
  const navigate=useNavigate();
const[deals,setDeals]=useState([]);
const dealsCollectionRef=collection(db,"deals");


const productNavigate=(deal)=>{
navigate("/product",{state:{productDet:deal}})
}
const login=()=>{
  navigate("/login")
}
const signup=()=>{
  navigate("/signup")
}
const dealProducts=(collectionDataName)=>{
  navigate("/productsList",{state:{collectionName:collectionDataName}});
}
useEffect(()=>{
  const getDealsData = async ()=>{
    const res = await getDocs(dealsCollectionRef);
    setDeals(res.docs.map((doc)=>({...doc.data(),name:doc.data().name,image:doc.data().image,old_price:doc.data().old_price,discount:doc.data().discount})))
  };
  getDealsData();
},[]);

const discountPrice=(old_price,discount)=>{
  return (old_price-(old_price*discount)/100).toFixed(0);
}

  return (

    <div className='main-div'>
    
    <div className='nav'>

        <div className='nav-item' ><h3 >OneYes<span className='logo-name'>Pharmacy</span></h3>
        </div>

        <div className='nav-item search'><input  className="home-search" placeholder='search for products'></input>
        <button type="submit" className='home-search-button'>Search</button> 
        </div>

        <div className='nav-item right'>
        <button className='home-logsign home-btn-log' onClick={login}>Login</button><h4>|</h4>
        <button className='home-logsign' onClick={signup}>Sign Up</button>
        </div>

        <div className='nav-item cart'>
            <img className="cart-img" src='https://icons.veryicon.com/png/o/miscellaneous/life-linear-icon/cart-44.png' alt='img'></img> 
        </div>

    </div>
    <div className='nav-hr-div'>
    <hr className='nav-hr'></hr>
    </div>


  {/* home category lists */}

    <div className='home-cat'>
    <div className='dropdown'>
    <div className='dropdown-toggle category-icon' data-mdb-toggle="dropdown" aria-expanded="false"  id="dropdownMenuButton">
        <img className='cat-icon' src="https://icons.veryicon.com/png/o/miscellaneous/blog-frequently-used/category-19.png" alt='img' width="20" height="20"/>
          <h6 className='shop-cat'>Shop By Category</h6>
    </div>
        
   <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
    <li><h6 class="dropdown-item">Best Deals</h6></li>
    <li><h6 class="dropdown-item">Vitamins Supplements</h6></li>
    <li><h6 class="dropdown-item">Ayurveda and Herbs</h6></li>
    <li><h6 class="dropdown-item">Health Food and Drink</h6></li>
    <li><h6 class="dropdown-item">Fitness</h6></li>
    <li><h6 class="dropdown-item">Wellness</h6></li>
  </ul>
    
  </div>

    <div className='cat-list'>
    <h6 className='cat-items'>Best Seller</h6>
    <h6 className='cat-items'>Brands</h6>
    <h6 className='cat-items'>Health & Beauty</h6>
 </div>

    </div>

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
  <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    
  </a>
  <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
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

<div className='grid-items-deal' onClick={()=>productNavigate(deal)}>




  <div className='deal-content'>
    <div className='cont-img-div'>
    <img className='deal-cont-pic' alt="" src={deal.image}></img>
    </div>
    
    <p className='deal-cont-p'>{deal.name}</p>
    <div className='discount-div-deals'>
    <h6 className='deal-old-price'>Rs.{deal.old_price}</h6>
    <h5>Rs.{discountPrice(deal.old_price,deal.discount)}</h5>
    <h6 className='deal-discount'>{deal.discount}% off</h6>
    </div>
    <div className='deal-add-to-cart'><h6 className='ad-cart'>Add to Cart</h6></div>
  
  </div>

</div>
))}

</div>

    
    </div>
  )
}

export default HomePage