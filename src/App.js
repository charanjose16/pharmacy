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
       </Routes>
    </div>
  );
}

export default App;
