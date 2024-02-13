import React from 'react'
import "./AdminHeader.css";
import 'bootstrap/dist/js/bootstrap.bundle.min';
const AdminHeader = () => {
  return (
    <div>

    <div  className="admin-header-div">
    <img className='admin-sidebar-img' type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" 
    aria-controls="offcanvasWithBothOptions" src='https://icons.veryicon.com/png/o/application/font-awesome/bars-3.png' width="30" height="30"></img>
    <h3>Admin Panel</h3>
    <button  className='btn btn-primary admin-logout-button'>Logout</button>
    </div>
    
<div className="offcanvas offcanvas-start" data-bs-scroll="true" tabindex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
  <div className="offcanvas-header">
    <h5 className="offcanvas-title sidebar-admin-text" id="offcanvasWithBothOptionsLabel" >Hello, Admin</h5>
    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div className="offcanvas-body">
    <div className='sidebar-main-div'>
        <div className='sidebar-list-div'><img src='https://icons.veryicon.com/png/o/application/reconsortia-icons/dashboard-87.png' height="25" width="25"></img><h6>Dashboard</h6></div>
        <div className='sidebar-list-div'><img src='https://icons.veryicon.com/png/o/business/official-website-monochrome-icon/other-products-1.png' height="25" width="25"></img><h6>Products</h6></div>
        <div className='sidebar-list-div'><img src='https://icons.veryicon.com/png/o/miscellaneous/h5-general-system-icon/orders-5.png' height="25" width="25"></img><h6>Orders</h6></div>
        <div className='sidebar-list-div'><img src='https://icons.veryicon.com/png/o/business/general-icon-of-customer-wealth-r-d-center/khcfdc-uu-customers.png' height="25" width="25"></img><h6>Customers</h6></div>
        <div className='sidebar-list-div'><img src='https://icons.veryicon.com/png/o/healthcate-medical/at-icon-library/feedback-18.png' height="25" width="25"></img><h6>Reviews</h6></div>


    </div>
  </div>
</div>

    </div>
  )
}

export default AdminHeader