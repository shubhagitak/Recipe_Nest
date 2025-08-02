import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';

const API_BASE_URL = 'http://localhost:5000/api';

const AdminPage = () => {
  const [recipes, setRecipes] = useState([]);
  const [editing, setEditing] = useState(null);
  const [newRecipe, setNewRecipe] = useState({
    name: '',
    description: '',
    imageUrl: '',
    ingredients: '',
    cookingProcess: '',
  });
  const [isAdding, setIsAdding] = useState(false);

  // Fetch all recipes from backend on mount
  useEffect(() => {
    fetch(`${API_BASE_URL}/recipes`)
      .then((response) => response.json())
      .then((data) => setRecipes(data))
      .catch((error) => console.error('Error fetching recipes:', error));
  }, []);

  // Edit Recipe
  const handleEdit = (recipe) => {
    setEditing(recipe._id);
    setNewRecipe({
      name: recipe.title,
      description: '', // No description in backend, left blank
      imageUrl: recipe.image || '',
      ingredients: recipe.ingredients,
      cookingProcess: recipe.instructions,
    });
  };

  // Save Recipe (Edit or Add)
  const handleSave = () => {
    const recipeData = {
      title: newRecipe.name,
      ingredients: newRecipe.ingredients,
      instructions: newRecipe.cookingProcess,
      image: newRecipe.imageUrl,
    };

    const token = localStorage.getItem('authToken');

    if (editing !== null) {
      // Update existing recipe
      fetch(`${API_BASE_URL}/recipes/${editing}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(recipeData),
      })
        .then((response) => response.json())
        .then((data) => {
          setRecipes((prev) =>
            prev.map((r) => (r._id === editing ? data : r))
          );
          setEditing(null);
          setIsAdding(false);
          setNewRecipe({
            name: '',
            description: '',
            imageUrl: '',
            ingredients: '',
            cookingProcess: '',
          });
        })
        .catch((error) => console.error('Error updating recipe:', error));
    } else {
      // Add new recipe
      fetch(`${API_BASE_URL}/recipes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(recipeData),
      })
        .then((response) => response.json())
        .then((data) => {
          setRecipes((prev) => [...prev, data]);
          setIsAdding(false);
          setNewRecipe({
            name: '',
            description: '',
            imageUrl: '',
            ingredients: '',
            cookingProcess: '',
          });
        })
        .catch((error) => console.error('Error adding recipe:', error));
    }
  };

  // Delete Recipe
  const handleDelete = (id) => {
    const token = localStorage.getItem('authToken');
    fetch(`${API_BASE_URL}/recipes/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then(() => {
        setRecipes((prev) => prev.filter((r) => r._id !== id));
      })
      .catch((error) => console.error('Error deleting recipe:', error));
  };

  // View Recipe
  const handleView = (recipe) => {
    alert(
      `Recipe Name: ${recipe.title}\nIngredients: ${recipe.ingredients}\nCooking Process: ${recipe.instructions}`
    );
  };

  // Toggle Add Recipe Form
  const handleAddRecipe = () => {
    setIsAdding(true);
    setEditing(null);
    setNewRecipe({
      name: '',
      description: '',
      imageUrl: '',
      ingredients: '',
      cookingProcess: '',
    });
  };

  return (
    <div className="admin-page">
      <h2>Admin Page</h2>
      <button onClick={handleAddRecipe} className="action-btn">
        Add Recipe
      </button>
      <div className="recipe-list">
        {recipes.map((recipe) => (
          <div className="recipe-card" key={recipe._id}>
            <div className="recipe-info">
              <h3>{recipe.title}</h3>
              {/* Description is optional */}
              {recipe.description && <p>{recipe.description}</p>}
              {recipe.image && (
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="recipe-image"
                />
              )}
            </div>
            <div className="recipe-actions">
              <button
                onClick={() => handleView(recipe)}
                className="action-btn"
              >
                View
              </button>
              <button
                onClick={() => handleEdit(recipe)}
                className="action-btn"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(recipe._id)}
                className="action-btn"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Recipe or Edit Recipe Form */}
      {(isAdding || editing !== null) && (
        <div className="edit-form">
          <h3>{editing ? 'Edit Recipe' : 'Add New Recipe'}</h3>
          <input
            type="text"
            value={newRecipe.name}
            onChange={(e) =>
              setNewRecipe({ ...newRecipe, name: e.target.value })
            }
            placeholder="Recipe Name"
          />
          <textarea
            value={newRecipe.description}
            onChange={(e) =>
              setNewRecipe({ ...newRecipe, description: e.target.value })
            }
            placeholder="Recipe Description"
          />
          <input
            type="text"
            value={newRecipe.imageUrl}
            onChange={(e) =>
              setNewRecipe({ ...newRecipe, imageUrl: e.target.value })
            }
            placeholder="Recipe Image URL"
          />
          <textarea
            value={newRecipe.ingredients}
            onChange={(e) =>
              setNewRecipe({ ...newRecipe, ingredients: e.target.value })
            }
            placeholder="Ingredients"
          />
          <textarea
            value={newRecipe.cookingProcess}
            onChange={(e) =>
              setNewRecipe({ ...newRecipe, cookingProcess: e.target.value })
            }
            placeholder="Cooking Process"
          />
          <button onClick={handleSave} className="save-btn">
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
