// src/components/Home.jsx
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const heroImageUrl = "https://www.simplyrecipes.com/thmb/g0QPVvawRfJIrlq09rn2cHKQpdk=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Simply-Recipes-Most-Popular-Recipes-Feature-LEAD-04-b4cc7e7bcfbe486586053a8e0a927d2f.jpg";

  const handleExploreClick = () => {
    navigate("/login", { state: { message: "Please Login to Explore Recipes" } });
  };

  return (
    <div className="home-hero">
      <div className="hero-image-container">
        <img 
          src={heroImageUrl} 
          alt="Delicious recipes collection" 
          className="hero-image" 
          onError={(e) => {
            e.target.onerror = null; 
            e.target.src = "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'%3E%3Crect fill='%23f5f7fa' width='800' height='600'/%3E%3Ctext fill='%23e63946' font-family='Poppins, sans-serif' font-size='40' x='400' y='300' text-anchor='middle'%3ERecipe Image%3C/text%3E%3C/svg%3E"
          }}
        />
      </div>
      
      <div className="hero-content">
        <h1 className="hero-title">Discover & Share Amazing Recipes</h1>
        <p className="hero-subtitle">
          Join thousands of food lovers exploring delicious recipes from around the world.
        </p>
        <button onClick={handleExploreClick} className="hero-button">
          Explore Recipes
        </button>
      </div>
    </div>
  );
}

export default Home;
