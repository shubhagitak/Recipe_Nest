import React, { useState, useEffect } from 'react';
// If you have a RecipeCard component, you can import it here
// import RecipeCard from './RecipeCard';

function UserDashboard() {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  // Fetch recipes from backend API when component mounts
  useEffect(() => {
    fetch('http://localhost:5000/api/recipes')
      .then(response => response.json())
      .then(data => setRecipes(data))
      .catch(error => console.error('Error fetching recipes:', error));
  }, []);

  const handleCardClick = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleBack = () => {
    setSelectedRecipe(null);
  };

  return (
    <div className="user-dashboard" style={{ maxWidth: 900, margin: '0 auto', padding: 24 }}>
      <h1 style={{ textAlign: 'center' }}>Welcome to the Recipe App</h1>

      {selectedRecipe ? (
        <div className="recipe-details" style={{ background: '#fff', padding: 24, borderRadius: 8 }}>
          <h2>{selectedRecipe.title}</h2>
          {selectedRecipe.image && (
            <img
              src={selectedRecipe.image}
              alt={selectedRecipe.title}
              style={{ maxWidth: '400px', width: '100%', margin: '10px 0', borderRadius: 8 }}
            />
          )}
          <h3>Ingredients</h3>
          <p style={{ whiteSpace: 'pre-wrap' }}>{selectedRecipe.ingredients}</p>
          <h3>Instructions</h3>
          <p style={{ whiteSpace: 'pre-wrap' }}>{selectedRecipe.instructions}</p>
          <button
            onClick={handleBack}
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              backgroundColor: '#1976d2',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Back to Recipes
          </button>
        </div>
      ) : (
        <div
          className="recipe-list"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: '20px',
            marginTop: 32,
          }}
        >
          {recipes.length > 0 ? (
            recipes.map((recipe) => (
              <div
                key={recipe._id}
                onClick={() => handleCardClick(recipe)}
                style={{
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  padding: '15px',
                  background: '#fafafa',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                  transition: 'transform 0.15s',
                }}
              >
                {/* If you have a RecipeCard component, you can use it here instead */}
                <h3>{recipe.title}</h3>
                {recipe.image && (
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: 6, marginBottom: 8 }}
                  />
                )}
                {/* Optionally, you can show a short description or ingredient preview */}
                {/* <p>{recipe.ingredients.slice(0, 50)}...</p> */}
              </div>
            ))
          ) : (
            <p style={{ gridColumn: '1/-1', textAlign: 'center' }}>No recipes available at the moment.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default UserDashboard;
