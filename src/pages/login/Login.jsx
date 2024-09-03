import { useCallback, useEffect } from "react";
import useAuthStore from "../../stores/use-auth-store";
import React from "react";
import "./Login.css";


const Login = () => {
    const {user,loginGoogleWithPopup,observeAuthState } = useAuthStore();

    useEffect(() => {
        observeAuthState();
    }
    ,[observeAuthState])

    const onHandlerLogin = useCallback (() => {
        loginGoogleWithPopup()
    },[loginGoogleWithPopup])


  return (
    <div className='wrapper'>
      <form action="">
        <h1>Login</h1>
        <div className="input-box">
          <input type="text" placeholder='Username' required/>
        </div>
        <div className="input-box">
          <input type="password" placeholder='Password' required/>
        </div>

        <div className="remember-forgot">
          <label> <input  type="checkbox" /> Remember me </label>
          <a href="#"> Forgot password </a>
        </div>

        <button type="submit">Login </button>

        <div className="register-link" >
          <p>Don't have an account? <a href="#"> Register </a> </p>
        </div>    
        </form> 
    </div>
  );
};

export default Login
