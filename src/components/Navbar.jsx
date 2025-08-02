import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Custom hook for authentication context

function Navbar() {
  const { user, logout } = useAuth(); // Get user information and logout function from context

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo Link */}
        <Link to="/" className="navbar-logo">
          RECIPE NESTRA
        </Link>

        <ul className="nav-menu">
          {/* Common Links for All Users */}
          <li className="nav-item">
            <Link to="/" className="nav-links">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-links">About</Link>
          </li>
          <li className="nav-item">
            <Link to="/contact" className="nav-links">Contact</Link>
          </li>

          {/* Conditional Rendering Based on User Authentication */}
          {user ? (
            <>
              {/* Dashboard link for logged-in users */}
              <li className="nav-item">
                <Link 
                  to={user.role === 'admin' ? '/AdminPage' : '/user-dashboard'} 
                  className="nav-links"
                >
                  Dashboard
                </Link>
              </li>
              {/* Logout button for logged-in users */}
              <li className="nav-item">
                <button 
                  className="nav-links logout-btn" 
                  onClick={logout}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'black',
                    cursor: 'pointer',
                    font: 'inherit',
                    padding: 0,
                  }}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              {/* Links for unauthenticated users */}
              <li className="nav-item">
                <Link to="/login" className="nav-links">Login</Link>
              </li>
              <li className="nav-item">
                <Link to="/signup" className="nav-links">Signup</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
