import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Signup() {
    const navigate = useNavigate()
    const [email ,setEmail] = useState("")
    const [password ,setPassword] = useState("")
    const emailError = document.querySelector('.email.error');
    const passwordError = document.querySelector('.password.error');
  
   const submitFun= async (e) => {
      e.preventDefault();
  
      // reset errors
      emailError.value = '';
      passwordError.value = '';
  
     
  
      try {
        const res = await fetch('https://notes-api-jdue.onrender.com/signup', { 
          method: 'POST', 
          body: JSON.stringify({ email, password }),
          headers: {'Content-Type': 'application/json'}
        });
        const data = await res.json();
        console.log(data);
        if (data.errors) {
          emailError.value = data.errors.email;
          passwordError.value = data.errors.password;
        }
        if (data.user) {
          navigate('/');
        }
  
      }
      catch (err) {
        console.log(err);
      }
  
    };
  return (
    <div  className="sin w-100 h-100  d-flex align-items-center">
      <form action="/signup" onSubmit={submitFun} className="card d-flex mx-auto  align-items-center w-50 p-2">
    <h2>Sign up</h2>
    <label for="email">Email</label>
        <input type="text" name="email" required onChange={(e)=>{setEmail(e.target.value)}}/>
        <div className="email error text-danger"></div>
        <label for="password">Password</label>
        <input type="password" name="password" required onChange={(e)=>{setPassword(e.target.value)}}/>
        <div className="password error text-danger"></div>
    <button type='submit' className="mt-2">Sign up</button>
  </form></div>
  )
}

export default Signup