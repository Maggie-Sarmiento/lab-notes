import styles from'./Header.module.css'
import { NavLink } from "react-router-dom";
import { useAuth } from '../../context/authContext';

const Header = () => {
  const { logOut } = useAuth()

  const loginOut = async() => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <header className={styles.mainHeader}> 
      <nav className={styles.menu}>
        <NavLink to="/">
            <img src="https://img.icons8.com/bubbles/50/000000/task.png" alt="logo" />
        </NavLink>
        <ul>
          <li><NavLink to="/home">Home</NavLink></li>
          <li><NavLink to="/nosotros">Nosotros</NavLink></li>
          <li><button className={styles.btnLogOut} onClick={ loginOut }>Salir</button></li>
        </ul>
      </nav>
  </header>
  )
}


export default Header;