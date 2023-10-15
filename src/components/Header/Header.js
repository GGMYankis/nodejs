import React, { useState, useCallback, useEffect } from "react";
import "./Header.css";
import ModalUpload from "../Modal/ModalUpload/ModalUpload";
import { Link } from "react-router-dom";
import Logo from "../../images/logo.jpeg";
import { Icon, Image } from "semantic-ui-react";
import ImageNotFound from "../../images/NOtFound.png";
import useAuth from "../../hooks/useAuth";
import { deleteToken } from "../../Token/token";
import { GET_USER } from "../../gql/user";
import { useQuery } from "@apollo/client";

function Header() {
  const [showModal, setShowModal] = useState(false);
  const [mode, setMode] = useState(false);

  useEffect(() => {
    const mode  =  localStorage.getItem('theme');
  
    if(mode === "dark"){
        setMode(false)
    }else{
   
     setMode(true)
    } 
  },[])

  const { auth, setAuth } = useAuth();

  const { data, loading } = useQuery(GET_USER, {
    variables: { username: auth.username },
  });

  function closeSession() {
    deleteToken();
    setAuth(null);
  }

  function showPerfil() {
    const avatar = document.querySelector(".box_perfil");
    avatar.classList.toggle("active");
  }

  function whiteMode (){

    document.body.classList.toggle('white-mode')

    if(localStorage.getItem('theme') === 'light'){
     
       setMode(false)
       localStorage.setItem('theme', 'dark')
    }else{
      setMode(true)
      localStorage.setItem('theme', 'light')
   
    }    
  }

  if (loading) return null;

 const { getUser } = data;
  return (
    <>
      <nav>
        <input type="checkbox" id="check" />
        <Link className="logo" to="/">
          Irannys
        </Link>
        <ul className="menu">
          <li>
            <Icon name={!mode ? "sun" : "moon"} className="mode_header"  onClick={whiteMode} />
          </li>
          <li>
            <Link to="/">
              <Icon name="home" />
            </Link>
          </li>
          <li>
            <Link to="/catalogo">Catalogo</Link>
          </li>
          <li>
            <Link to="/creador">Creador</Link>
          </li>

          <li onClick={showPerfil} className="avatar_headers">
            <span  className="avatar">
              <Image src={getUser.avatar ? getUser.avatar : ImageNotFound} avatar />
            </span>
          </li>
        </ul>

        <label for="check">
          <Icon name="bars" className="bars_icon" />
        </label>

        <div className="perfil">
          <div className="box_perfil">
            <ul>
              <li>
                <Icon name="user" />
                <Link to={`/perfil/${auth.username}`}>Ver perfil</Link>
              </li>
              <li>
                <Icon name="sign-out" />
                <p onClick={closeSession}>Cerrar la sesión</p>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <ModalUpload show={showModal} setShow={setShowModal} />
    </>
  );
}

export default Header;
