/* eslint-disable react/function-component-definition */
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Register from '../sections/Register';
import { useAuth } from '../../context/authContext';
import styles from './Login.module.css';

const Login = () => {
  const [loginError, setLoginError] = useState();
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const [openPop, setOpenPop] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    const expEmail = /^\w+([.+-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/;
    const expPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
    const email = e.target.inputEmail.value;
    const password = e.target.inputPass.value;

    if (expEmail.test(email) && expPassword.test(password)) {
      try {
        await login(email, password);
        navigate('/home');
      } catch (error) {
        console.log(error);
      }
    } else {
      setLoginError('Usuario o contraseña incorrecta');
    }
  };

  const sigInGoogle = async () => {
    try {
      await loginWithGoogle();
      navigate('/home');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className={styles.login}>
      <section className={styles.welcome}>
        <h2 className={styles.welcomeText}>Bienvenido a Noted</h2>
        <div className={styles.loginWelcome}>
          <div className={styles.loginLeft}>
            <img
              className={styles.imgWelcome}
              src="https://svgshare.com/i/g_v.svg"
              alt="img-login"
            />
          </div>
          <div className={styles.loginRight}>
            <form className={styles.formLogin} onSubmit={submit}>
              <input className={styles.input} id="inputEmail" type="text" placeholder="Email" required />
              <input className={styles.input} id="inputPass" type="password" placeholder="Contraseña" required />
              { loginError && <div className={styles.alertLogin} id="alertLogin">{loginError}</div> }
              <button type="submit" className={` ${styles.btn} ${styles.btnLogin}`} id="btnLogin">Iniciar Sesion</button>
            </form>
            <button type="button" className={`${styles.btn} ${styles.btnGoogle}`} id="btnGoogle" onClick={sigInGoogle}>Google</button>
            <div className={styles.alertAuth} />
            <div className={styles.registration}>
              <span>¿No tienes cuenta?</span>
              <button type="button" className={`${styles.btn} ${styles.btnRegister}`} onClick={() => setOpenPop(true)}>Registrate</button>
              { /* <a href="/" className="link-registration"
              id="linkRegistration">Registrate</a> */ }
            </div>
          </div>
        </div>
      </section>
      <Register openPop={openPop} onClose={() => setOpenPop(false)} />
    </section>
  );
};

export default Login;
