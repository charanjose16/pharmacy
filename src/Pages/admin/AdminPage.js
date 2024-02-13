import React from 'react';
import "./AdminPage.css";
import 'bootstrap/dist/js/bootstrap.bundle.min';
import AdminHeader from "../../Components/AdminHeader";

const AdminPage = () => {
  return (
    <div>
    <AdminHeader></AdminHeader>
    <h2 style={{display:'flex',justifyContent:'center',marginTop:100}}>Admin Main Page</h2>
    </div>
  )
}

export default AdminPage