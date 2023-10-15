import "./RegisterForm.css";

const RegisterForm = ({setShowLogin}) => {
  return(
    
    

      <form className="cont-register" >
      <h2>Registrate para ver fotos de irannys</h2>

         <label>Usuario</label>
        <input className="form-control" placeholder="Usuario" name="" />
        <label>Correo</label>
        <input className="form-control"  placeholder="Correo" name=""/>
        <label>Contraseña</label>
        <input className="form-control"  placeholder="Contraseña" name=""/>
        <button className="btn-register">Crear</button>
    </form>
  
   
  
  )
}

export default RegisterForm

