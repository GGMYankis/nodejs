import jwtDecode from "jwt-decode";

export async function setToken(token) {
 
  localStorage.setItem('token', token);
}
export  function getToken() {
 return localStorage.getItem('token')
 
}

export function deleteToken(){
 return localStorage.removeItem('token');
}

export function decodeToken(token) {
  return jwtDecode(token);
}
