import './Register.css'
import { useState } from 'react';
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';

const Register = ({openPop, onClose}) => {
  const [loginError, setLoginError] = useState()
  const { signUp } = useAuth()
  const navigate = useNavigate()
  if(!openPop) return null;

  const submit = async (e) => {
    e.preventDefault()
    const expEmail = /^\w+([.+-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/;
    const expPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
    const email = e.target.inputEmailR.value;
    const password = e.target.inputPassR.value;
    const passConfirm = e.target.inputPassConf.value;

    if (expEmail.test(email) && expPassword.test(password) && expPassword.test(passConfirm)) {
      if (password === passConfirm){
        try {
          await signUp(email, password)
          navigate('/home')
        } catch (error) {
          console.log(error);
        }
      } else {
        setLoginError("Las contraseñas no coinciden")
      }
    } else {
      setLoginError("Usuario o contraseña invalida")
    }
  };

  return (
    <section className="overlay" id="overlay">
      <div className="popup">
        <button className="btn-close-popup" id="btnClosePopup" onClick={onClose}>X</button>
        <h3>Registrate </h3>{/* <p>es rápido y fácil</p> */}
        <form className="form-registration" onSubmit={submit}>
          <input id="userName" className="input" type="text" placeholder="Nombre: " />
          <input id="userLastName" className="input" type="text" placeholder="Apellido: " />
          <input id="inputEmailR" className="input" type="email" placeholder="Correo: " />
          <input id="inputPassR" className="input" type="password" placeholder="Contraseña: " />
          <input id="inputPassConf" className="input" type="password" placeholder="Confirmar Contraseña: " />
          {loginError && <div className="alert-register" id="alertRegister">{loginError}</div>}
          <div className="date-of-birth">
            <label>Fecha de Creación: </label>
            <input id="dateOfBirth" type="date" />
          </div>
          <button className="button btn-registration" id="btnRegistration">Registrate</button>
        </form>
      </div>
    </section>
  )
}

export default Register;