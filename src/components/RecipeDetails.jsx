import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

// Function to fetch recipe details based on ID
const fetchRecipeDetails = async (id) => {
  try {
    const response = await fetch(`/api/recipes/${id}`);
    if (!response.ok) {
      throw new Error('Recipe not found');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching recipe details:', error);
    return null; // Return null if an error occurs
  }
};

function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  // Fetch recipe details when the component mounts
  useEffect(() => {
    const getRecipeDetails = async () => {
      const data = await fetchRecipeDetails(id);
      setRecipe(data);
    };

    getRecipeDetails();
  }, [id]);

  if (!recipe) {
    return <p>Loading...</p>; // Show loading message while fetching data
  }

  return (
    <div className="recipe-details">
      <div className="recipe-details-card">
        <h1 className="recipe-title">{recipe.title}</h1>
        <img src={recipe.image} alt={recipe.title} className="recipe-image" />
        <p className="recipe-description">{recipe.description}</p>

        <h3 className="section-title">Ingredients</h3>
        <ul className="recipe-list">
          {recipe.ingredients.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

        <h3 className="section-title">Instructions</h3>
        <ol className="recipe-list">
          {recipe.instructions.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>

        <div className="recipe-rating">⭐ Rating: {recipe.rating} / 5</div>
      </div>
    </div>
  );
}

export default RecipeDetails;
