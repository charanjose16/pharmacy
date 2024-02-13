import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
import {collection} from "firebase/firestore";


const Header = () => {
  const [user, setUser] = useState("");
  const [isLoggedIn,setIsLoggedIn]=useState(false);
  console.log(user);
  const login=()=>{
    navigate("/login")
  }
  const signup=()=>{
    navigate("/signup")
  }

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        fetchUserData(authUser.uid);
        setIsLoggedIn(true);
      } else {
        setUser(null);
        setIsLoggedIn(false);
      }
    });
    return () => unsubscribeAuth();
  }, []);
  const fetchUserData = async (uid) => {
    try {
      const userDoc = await db.collection('users').doc(uid).get();
      if (userDoc.exists()) {
        setUser({ uid, ...userDoc.data(),name:userDoc.data().name});
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };


  const handleLogout = async () => {
    try {
      await auth.signOut();
      setUser(null);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
  const navigate=useNavigate();
  
  const dealProducts=(collectionDataName)=>{
    navigate("/productsList",{state:{collectionName:collectionDataName}});
  }
  const logoHome=()=>{
    navigate('/')
  }
  return (
    <div>
        <div className='nav'>

        <div className='nav-item' onClick={logoHome}><h3 >OneYes<span className='logo-name'>Pharmacy</span></h3>
        </div>

<div className='nav-item search'><input  className="home-search" placeholder='search for products'></input>
<button type="submit" className='home-search-button'>Search</button> 
</div>
{isLoggedIn?(<div>
              <span className='username'><h5>{user.name}</h5></span>
              <button className='home-logsign' onClick={handleLogout}>Logout</button>
            </div>):
            (<div className='nav-item right'>
<button className='home-logsign home-btn-log' onClick={login}>Login</button><h4>|</h4>
<button className='home-logsign' onClick={signup}>Sign Up</button>
</div>) }


<div className='nav-item cart'>
    <img className="cart-img" src='https://icons.veryicon.com/png/o/miscellaneous/life-linear-icon/cart-44.png'></img> 
</div>

</div>
<div className='nav-hr-div'>
<hr className='nav-hr'></hr>
</div>


{/* home category lists */}

<div className='home-cat'>
<div className='dropdown'>
<div className='dropdown-toggle category-icon' data-mdb-toggle="dropdown" aria-expanded="false"  id="dropdownMenuButton">
<img className='cat-icon' src="https://icons.veryicon.com/png/o/miscellaneous/blog-frequently-used/category-19.png" width="20" height="20"/>
  <h6 className='shop-cat'>Shop By Category</h6>
</div>

<ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
    <li><h6 class="dropdown-item" onClick={()=>{
      dealProducts("deals")
    }}>Best Deals</h6></li>
    <li><h6 class="dropdown-item"  onClick={()=>{
      dealProducts("supplements")
    }}>Supplements</h6></li>
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
    </div>
  )
}

export default Header