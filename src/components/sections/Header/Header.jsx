import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';
import { useAuth } from '../../../context/authContext';

function Header() {
  const { logOut } = useAuth();

  const loginOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <header className={styles.mainHeader}>
      <nav className={styles.menu}>
        <NavLink to="/">
          <img
            className={styles.logo}
            src="https://svgshare.com/i/g_v.svg"
            alt="logo"
          />
        </NavLink>
        <ul>
          <li><NavLink to="/home">Home</NavLink></li>
          <li><NavLink to="/nosotros">Nosotros</NavLink></li>
          <li><button type="button" className={styles.btnLogOut} onClick={loginOut}>Salir</button></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
