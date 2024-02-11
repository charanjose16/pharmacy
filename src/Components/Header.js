import React from 'react'

const Header = () => {
  return (
    <div>
        <div className='nav'>

        <div className='nav-item' ><h3 >OneYes<span className='logo-name'>Pharmacy</span></h3>
        </div>

<div className='nav-item search'><input  className="home-search" placeholder='search for products'></input>
<button type="submit" className='home-search-button'>Search</button> 
</div>

<div className='nav-item right'>
<button className='home-logsign home-btn-log'>Login</button><h4>|</h4>
<button className='home-logsign'>Sign Up</button>
</div>

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
<li><a class="dropdown-item" href="#">Sports Nutrition</a></li>
<li><a class="dropdown-item" href="#">Vitamins Supplements</a></li>
<li><a class="dropdown-item" href="#">Ayurveda and Herbs</a></li>
<li><a class="dropdown-item" href="#">Health Food and Drink</a></li>
<li><a class="dropdown-item" href="#">Fitness</a></li>
<li><a class="dropdown-item" href="#">Wellness</a></li>
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