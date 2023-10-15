import "./App.css";
import Auth from "./pages/auth/Auth";
import client from "./configServer/apolloServer";
import { ApolloProvider } from "@apollo/client";
import { useState, useEffect, useMemo } from "react";
import AuthContext from "./EstadoGlobal/estado";
import { setToken, getToken, decodeToken } from "./Token/token";
import Navigation from "./routes/Navigation";

function App() {
  const [auth, setAuth] = useState(undefined);

  useEffect(() => {
    if(localStorage.getItem('theme') === 'light'){
      document.body.classList.toggle('white-mode')
    }
  },[])

  useEffect(() => {
    const token  = getToken();
   
      if(!token){
         setAuth(null)
        return;
      }
     
      setAuth(decodeToken(token))
     },[])
 

  const setUser = (user) => {
    setAuth(user);
  };
  const authData = useMemo(
    () => ({
      auth,
      setUser,
      setAuth
    }),
    [auth]
  );


  if (auth === undefined) return null;

  return (
    <ApolloProvider client={client}>
      <AuthContext.Provider value={authData}>
        {auth ? <Navigation/> : <Auth />}
      </AuthContext.Provider>
    </ApolloProvider>
  );
}

export default App;
