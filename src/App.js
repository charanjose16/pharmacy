import React from "react";
import { Route,Routes} from "react-router-dom"
import './App.css';
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import ForgetPassword from "./Components/ForgetPassword";
import HomePage from "./Pages/HomePage";
import ProductDetails from "./Pages/ProductDetails";
import Header from "./Components/Header";
import Products from "./Pages/Products";
import AdminPage from "./Pages/admin/AdminPage";
import AdminHeader from "./Components/AdminHeader";
import AdminProducts from "./Pages/admin/AdminProducts";
import EditProduct from "./Pages/admin/EditProduct";
import AddProducts from "./Pages/admin/AddProducts";
import AllProducts from "./Pages/admin/AllProducts";
import AddSearchHeader from "./Components/AddSearchHeader";


function App() {
  return (
    <div className="App">
       <Routes>
        <Route exact path='/' element={<HomePage/>}/>
        <Route exact path='/login' element={<Login/>}/>
        <Route exact path='/signup' element={<SignUp/>}/>
        <Route exact path='/forgetpw' element={<ForgetPassword/>}/>
        <Route exact path='/product' element={<ProductDetails/>}/>
        <Route exact path='/header' element={<Header/>}/>
        <Route exact path='/productsList' element={<Products/>}/>
        <Route exact path='/admin' element={<AdminPage/>}/>
        <Route exact path='/adminHeader' element={<AdminHeader/>}/>
        <Route exact path='/adminProducts' element={<AdminProducts/>}/>
        <Route exact path='/editProduct' element={<EditProduct/>}/>
        <Route exact path='/addProducts' element={<AddProducts/>}/>
        <Route exact path='/allProducts' element={<AllProducts/>}/>
        <Route exact path='/addSearch' element={<AddSearchHeader/>}/>
       </Routes>
    </div>
  );
}

export default App;
