import styles from'./Login.module.css'
import { useState } from 'react';
import Register from '../sections/Register';
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [loginError, setLoginError] = useState()
  const { login, loginWithGoogle } = useAuth()
  const navigate = useNavigate()

  const [openPop, setOpenPop] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    const expEmail = /^\w+([.+-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/;
    const expPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
    const email = e.target.inputEmail.value;
    const password = e.target.inputPass.value;

    if (expEmail.test(email) && expPassword.test(password)) {
      try {
        await login(email, password)
        navigate('/home')
      } catch (error) {
        console.log(error);
      }
    } else {
      setLoginError("Usuario o contraseña incorrecta")
    }
   
  };

  const sigInGoogle = async() => {
    try {
      await loginWithGoogle()
      navigate('/home')
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section className={styles.login}>
      <section className={styles.welcome}>
          <h2 className={styles.welcomeText}>Bienvenido a Noted</h2>
        <div className={styles.loginWelcome}>
          <div className={styles.loginLeft}>
            <img className={styles.imgWelcome} src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Paper-notes.svg/1024px-Paper-notes.svg.png" alt="img-login" />
          </div>
          <div className={styles.loginRight}>
            <form className={styles.formLogin} onSubmit={submit}>
              <input className={styles.input} id="inputEmail" type="text" placeholder="Email" required />
              <input className={styles.input} id="inputPass" type="password" placeholder="Contraseña" required />
              { loginError && <div className={styles.alertLogin} id="alertLogin">{loginError}</div> }
              <button className={` ${styles.btn} ${styles.btnLogin}`} id="btnLogin">Iniciar Sesion</button>
            </form>
              <button className={`${styles.btn} ${styles.btnGoogle}`} id="btnGoogle" onClick={ sigInGoogle }>Google</button>
              <div className={styles.alertAuth}></div>
              <div className={styles.registration}>
                <span>¿No tienes cuenta?</span>
                <button className={`${styles.btn} ${styles.Register}`} onClick={() => setOpenPop(true)}>Registrate</button>
                {/* <a href="/" className="link-registration" id="linkRegistration">Registrate</a> */}
              </div>
          </div>
        </div>
      </section>
      <Register openPop={openPop} onClose={() => setOpenPop(false)} />
    </section>
  )
}

export default Login;