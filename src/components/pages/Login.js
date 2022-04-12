import './Login.css'
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
    <section className="login">
      <section className="welcome">
          <h2 className='welcome-text'>Bienvenido a Noted</h2>
        <div className="login_welcome">
          <div className="login_left">
            <img className='img-welcome' src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Paper-notes.svg/1024px-Paper-notes.svg.png" alt="img-login" />
          </div>
          <div className="login_right">
            <form className="form-login" onSubmit={submit}>
              <input className="input" id="inputEmail" type="text" placeholder="Email" required />
              <input className="input" id="inputPass" type="password" placeholder="Contraseña" required />
              { loginError && <div className="alert-login" id="alertLogin">{loginError}</div> }
              <button className="btn btn-login" id="btnLogin">Iniciar Sesion</button>
            </form>
              <button className="btn btn-google" id="btnGoogle" onClick={ sigInGoogle }>Google</button>
              <div className="alert-auth"></div>
              <div className="registration">
                <span>¿No tienes cuenta?</span>
                <button className='btn btn-register' onClick={() => setOpenPop(true)}>Registrate</button>
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