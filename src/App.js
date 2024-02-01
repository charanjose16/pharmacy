import React from "react";
import { Route,Routes } from "react-router-dom"
import './App.css';
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import ForgetPassword from "./Components/ForgetPassword";
import HomePage from "./Pages/HomePage";


function App() {
  return (
    <div className="App">
       <Routes>
        <Route exact path='/' element={<Login/>}/>
        <Route exact path='/signup' element={<SignUp/>}/>
        <Route exact path='/forgetpw' element={<ForgetPassword/>}/>
        <Route exact path='/home' element={<HomePage/>}/>
       </Routes>
    </div>
  );
}

export default App;
