import { useState } from "react";
import Login from "../../components/auth/loginForm/Login";
import RegisterForm from "../../components/auth/registerForm/RegisterForm";
import "./Auth.css";

const Auth = () => {
  const [showLogin, setShowLogin] = useState(true);
  return (
    <div className="auth">
      {
        !showLogin &&(
          <div className="show_login">
          <p> ¿Ya tienes una cuenta?</p>
          <button onClick={() => setShowLogin(true)}>Inicia sesión</button>
        </div>
        )
      }
    
      <div className="form-auth">
        {showLogin ? (
          <Login setShowLogin={setShowLogin} />
        ) : (
          <RegisterForm setShowLogin={setShowLogin} />
        )}
      </div>
    </div>
  );
};

export default Auth;
