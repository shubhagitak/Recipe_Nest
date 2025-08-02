import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Login from './components/Login';
import Signup from './components/Signup';
import UserDashboard from './components/UserDashboard';
import AdminPage from './components/AdminPage';
import RecipeDetails from './components/RecipeDetails';
import Navbar from './components/Navbar';
import './App.css';

// Function to get user's role from localStorage
const getUserRole = () => {
  const userData = JSON.parse(localStorage.getItem('userData'));
  return userData?.role; // role should be 'user' or 'admin'
};

function App() {
  const userRole = getUserRole(); // Get role before rendering routes

  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* Redirect login to dashboard based on role */}
          <Route
            path="/login"
            element={
              userRole === 'admin' ? (
                <Navigate to="/admin-page" />
              ) : userRole === 'user' ? (
                <Navigate to="/user-dashboard" />
              ) : (
                <Login />
              )
            }
          />

          <Route path="/signup" element={<Signup />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/admin-page" element={<AdminPage />} />
          <Route path="/recipes/:id" element={<RecipeDetails />} />
          <Route path="*" element={<h2>404 - Page Not Found</h2>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
