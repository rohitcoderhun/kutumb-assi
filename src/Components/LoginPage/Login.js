import axios from 'axios';
import React, { useState } from 'react'
// import codeimg from './codeimg.jpg'
import { useNavigate } from 'react-router-dom';
import './Login.css'

const Login = () => {
    const [username,setUsername]=useState('');
    const [otp,setOtp]=useState(null);
    const [image,setImage]=useState(null);

    const navigate=useNavigate();

    const handleChange=(e)=>{
        if(e.target.name=='username'){
            setUsername(e.target.value);
        }
        else if(e.target.name=='image'){
            setImage(e.target.value);
            console.log(image)
        }
        else{
            setOtp(e.target.value);
        }
    }

    let loginApi=async ()=>{
        let response=await fetch('https://assignment.stage.crafto.app/login', {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                username,
                otp,
              }),
           });
           if(response.ok){
            let data=await response.json();
            console.log(data);
            localStorage.setItem('token',data.token);
            navigate('/quotes')
           }
    }

    let imageUploadApi=async (formdata)=>{
        let data=await fetch('https://crafto.app/crafto/v1.0/media/assignment/upload',{
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body:formdata
           });
        if(data.ok){
            let data=await data.json();

        }
    }
        

    const handleSubmit=(e)=>{
        e.preventDefault();
        if(username.length>0 && otp){

            
            
            loginApi();
        
        }
        else{
            alert("please provide username and otp");
        }
    }
    



  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-title">Welcome Back</h2>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">OTP</label>
          <input
            type="password"
            id="password"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
        
      </form>
    </div>
  )
}

export default Login