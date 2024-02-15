import React from 'react'
import { useNavigate } from 'react-router-dom'
const AddSearchHeader = () => {
    const navigate=useNavigate();
  return (
    <div>
        <div>
      <div className='admin-prod-add-div'>
          <div><button className='btn btn-primary admin-add-button' onClick={()=>{navigate("/AddProducts")}}>+ Add products</button></div>
          <div><div className='nav-item search'><input  className="home-search" placeholder='search for products'></input>
             <button type="submit" className='home-search-button'>Search</button> 
         </div></div>
      </div>
    </div>
    </div>
  )
}

export default AddSearchHeader