import { Link } from 'react-router-dom';
import '../App.css'; // Make sure this path is correct

function RecipeCard({ id, title, description, rating, image }) {
  return (
    <div className="recipe-card">
      <img src={image} alt={title} className="recipe-card-image" />
      <h2 className="recipe-card-title">{title}</h2>
      <p className="recipe-card-description">{description}</p>
      <div className="recipe-card-rating">
        <span>Rating: {rating}</span>
        {/* You can add a star or other UI for rating */}
      </div>
      {/* Correct the Link component to use template literals */}
      <Link to={`/recipes/${id}`}>
        <button className="recipe-card-button">View Recipe</button>
      </Link>
    </div>
  );
}

export default RecipeCard;
