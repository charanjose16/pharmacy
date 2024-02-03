import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import "./HomePage.css";

const HomePage = () => {
  return (
    <div>
    <div className='nav'>

        <div className='nav-item' ><h1>pharmacy</h1>
        </div>

        <div className='nav-item search'><input  className="home-search" placeholder='search for products'></input>
        <button type="submit" className='home-search-button'>Search</button> 
        </div>

        <div className='nav-item right'>
        <button className='home-logsign'>Login</button><h4>|</h4>
        <button className='home-logsign'>Sign Up</button>
        </div>

    </div>
    </div>
  )
}

export default HomePage