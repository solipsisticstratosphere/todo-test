import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = ({ user, onLogout }) => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <Link to="/" className={styles.logo}>
          Todo App
        </Link>
        <div className={styles.navLinks}>
          {user ? (
            <>
              <span className={styles.username}>Hello, {user.username}</span>
              <button onClick={onLogout} className={styles.logoutButton}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className={styles.navLink}>
                Login
              </Link>
              <Link to="/register" className={styles.navLink}>
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
