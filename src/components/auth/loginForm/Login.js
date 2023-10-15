import "./login.css";
import formik, { useFormik } from "formik";
import * as Yup from "yup";
import { LOGIN_USER } from "../../../gql/user";
import { useMutation } from "@apollo/client";
import { setToken, decodeToken } from "../../../Token/token";
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";

const Login = ({setShowLogin}) => {
  const [loginUser] = useMutation(LOGIN_USER);
  const[errorUser , setErrorUser] = useState(null);

  const { setUser } = useAuth();

  const formik = useFormik({
    initialValues: values(),
    validationSchema: Yup.object({
      username: Yup.string().required("El usuario es obligatorio"),
      password: Yup.string().required("la contrasena es obligatoria"),
    }),
    onSubmit: async (formValue) => {
      try {
        const result = await loginUser({
          variables: {
            input: {
              username: formValue.username,
              password: formValue.password,
            },
          },
        });
        const { token } = result.data.loginUser;

        setToken(token);
        setUser(decodeToken(token));
      } catch (error) {
        console.log(error.message);
        setErrorUser(error.message)
      }
    },
  });
  return (
    <>
      <form className="cont-login" onSubmit={formik.handleSubmit}>
        <h2>Entra para ver fotos de irannys</h2>

        { errorUser &&  (
        <div className="alert alert-danger">
          
            {errorUser}
         
        </div>
         )}
        <label>Usuario</label>
        <input
        className="form-control"
          placeholder="Usuario"
          name="username"
          onChange={formik.handleChange}
        />
        <label>Contrasena</label>
        <input
         className="form-control"
          placeholder="Contrasena"
          name="password"
          onChange={formik.handleChange}
        />
        <button className="btn-login" type="submit">
          Log in
        </button>
        <div className="footer">
          <p>No tienes cuenta ?<span onClick={() => setShowLogin(false)} className="crear">Crear Cuenta</span> </p>
        </div>
      </form>
    </>
  );
};

export default Login;

function values() {
  return {
    username: "",
    password: "",
  };
}
