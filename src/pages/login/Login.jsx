import { useEffect, useState, useCallback } from "react";
import useAuthStore from "../../stores/use-auth-store";
import { useNavigate } from "react-router-dom";
import { FaRegUserCircle, FaLock } from "react-icons/fa";
import "./Login.css";
import userDAO from "../../daos/userDAO";

const Login = () => {
  const { user, loading, error, loginGoogleWithPopUp, observeAuthState, clearError } = useAuthStore();
  const navigate = useNavigate();
  const [isInitialized, setIsInitialized] = useState(false);

  // useEffect for observing authentication state and setting the background
  useEffect(() => {
    if (user) {
      const newUser = {
        email: user.email,
        name: user.displayName,
        photo: user.photoURL,
      };
      userDAO.createUser(newUser);
      navigate("/Home");
    }
  }, [user, navigate]);
  // useEffect(() => {
  //   document.body.classList.add("login-background");
  //   const unsubscribe = observeAuthState();
  //   setIsInitialized(true);
    
  //   return () => {
  //     document.body.classList.remove("login-background");
  //     unsubscribe();
  //   };
  // }, [observeAuthState]);

  // useEffect to navigate to the home page when a user logs in
  useEffect(() => {
    observeAuthState();
  }, [observeAuthState]);

  // Handles Google login action using useCallback for memoization
  const handleLogin = useCallback(() => {
    loginGoogleWithPopUp();
  }, [loginGoogleWithPopUp]);

  // const handleLogout = useCallback(() => {
  //   logout();
  // }, [logout])

  // If the auth flow is not initialized or it's loading, show a loading message
  // if (!isInitialized || loading) {
  //   return <div>Loading...</div>;
  // }
// If the user is already logged in, return null to avoid showing the login form
  if (user) {
    return null;
  }

  // The main JSX layout for the login form
  return (
    <div className="wrapper">
      {error && (
        <div className="error-message">
          {error}
          <button onClick={clearError}>Clear error</button>
        </div>
      )}
      <form onSubmit={(e) => e.preventDefault()}>
        <h1>Login</h1>
        <div className="input-box">
          <input type="text" placeholder="Username" required />
          <FaRegUserCircle className="icon" />
        </div>
        <div className="input-box">
          <input type="password" placeholder="Password" required />
          <FaLock className="icon" />
        </div>

        <div className="remember-forgot">
          <label>
            <input type="checkbox" /> Remember me
          </label>
          <a href="#"> Forgot password </a>
        </div>

        <button type="submit">login</button>

        <button type="button" onClick={handleLogin}>sign in with google account</button>

        <div className="register-link">
          <p> Don t have an account? <a href="#"> Register </a></p>
        </div>
      </form>
    </div>
  );
};

export default Login;