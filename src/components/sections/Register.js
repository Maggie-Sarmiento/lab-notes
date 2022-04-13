import styles from'./Register.module.css'
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
    <section className={styles.overlay} id="overlay">
      <div className={styles.popup}>
        <button className={styles.btnClosePopup} id="btnClosePopup" onClick={onClose}>X</button>
        <h3>Registrate </h3>{/* <p>es rápido y fácil</p> */}
        <form className={styles.formRegistration} onSubmit={submit}>
          <input id="userName" className={styles.input} type="text" placeholder="Nombre: " />
          <input id="userLastName" className={styles.input} type="text" placeholder="Apellido: " />
          <input id="inputEmailR" className={styles.input} type="email" placeholder="Correo: " />
          <input id="inputPassR" className={styles.input} type="password" placeholder="Contraseña: " />
          <input id="inputPassConf" className={styles.input} type="password" placeholder="Confirmar Contraseña: " />
          {loginError && <div className={styles.alertRegister} id="alertRegister">{loginError}</div>}
          <button className={`${styles.btn} ${styles.btnRegistration}`} id="btnRegistration">Registrate</button>
        </form>
      </div>
    </section>
  )
}

export default Register;