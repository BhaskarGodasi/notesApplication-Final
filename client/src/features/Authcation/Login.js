import React, {  useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate()
    const [email ,setEmail] = useState("")
    const [password ,setPassword] = useState("")
    // const ref =useRef()
    const emailError = document.querySelector('.email.error');
    const passwordError = document.querySelector('.password.error');
  
    const submitFun = async (e) => {
      e.preventDefault();
  
      // reset errors
      emailError.innerHTML = '';
      passwordError.innerHTML = '';
  
  
      try {
        const res = await fetch('https://notes-api-jdue.onrender.com/login', { 
          method: 'POST', 
          body: JSON.stringify({ email, password }),
          headers: {'Content-Type': 'application/json'}
        });
        const data = await res.json();
        console.log(data);
        if (data.errors) {
          emailError.innerHTML = data.errors.email;
          passwordError.innerHTML = data.errors.password;
        }
        if (data.user) {
          navigate('/DisplayData');
        }
  
      }
      catch (err) {
        console.log(err);
      }
  
    };
  return (
    <div className="log w-100 h-100  d-flex align-items-center">
      <form action="/signup" onSubmit={submitFun} className="card d-flex mx-auto  align-items-center w-50 p-2">
        <h2>Login</h2>
        <label for="email">Email</label>
        <input type="text" name="email" required onChange={(e)=>{setEmail(e.target.value)}}/>
        <div className="email error text-danger"></div>
        <label for="password">Password</label>
        <input type="password" name="password" required onChange={(e)=>{setPassword(e.target.value)}}/>
        <div className="password error text-danger"></div>
        <button type="submit" className="mt-2">login</button>

        <div>
           <span> <p>If your are a new user ?</p>
            <Link to='/signup'>Singup</Link></span>
        </div>
      </form>
    </div>
  );
}

export default Login;
