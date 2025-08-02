// components/RecipeForm.jsx
import { useState } from 'react';


function RecipeForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [ingredients, setIngredients] = useState(['']);
  const [instructions, setInstructions] = useState(['']);
  const [categories, setCategories] = useState([]);

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, '']);
  };

  const removeIngredient = (index) => {
    if (ingredients.length > 1) {
      const newIngredients = [...ingredients];
      newIngredients.splice(index, 1);
      setIngredients(newIngredients);
    }
  };

  const handleInstructionChange = (index, value) => {
    const newInstructions = [...instructions];
    newInstructions[index] = value;
    setInstructions(newInstructions);
  };

  const addInstruction = () => {
    setInstructions([...instructions, '']);
  };

  const removeInstruction = (index) => {
    if (instructions.length > 1) {
      const newInstructions = [...instructions];
      newInstructions.splice(index, 1);
      setInstructions(newInstructions);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log({
      title,
      description,
      image,
      ingredients: ingredients.filter(i => i.trim() !== ''),
      instructions: instructions.filter(i => i.trim() !== ''),
      categories
    });
    alert('Recipe saved successfully!');
  };

  return (
    <div className="recipe-form-container">
      <h1>{title || 'New Recipe'}</h1>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Recipe Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Image URL</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="https://example.com/image.jpg"
          />
        </div>
        
        <div className="form-section">
          <h2>Ingredients</h2>
          {ingredients.map((ingredient, index) => (
            <div key={index} className="ingredient-row">
              <input
                type="text"
                value={ingredient}
                onChange={(e) => handleIngredientChange(index, e.target.value)}
                placeholder="e.g. 1 cup flour"
              />
              <button
                type="button"
                onClick={() => removeIngredient(index)}
                className="remove-btn"
              >
                ×
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addIngredient}
            className="add-btn"
          >
            + Add Ingredient
          </button>
        </div>
        
        <div className="form-section">
          <h2>Instructions</h2>
          {instructions.map((instruction, index) => (
            <div key={index} className="instruction-row">
              <textarea
                value={instruction}
                onChange={(e) => handleInstructionChange(index, e.target.value)}
                placeholder="Step by step instructions"
              />
              <button
                type="button"
                onClick={() => removeInstruction(index)}
                className="remove-btn"
              >
                ×
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addInstruction}
            className="add-btn"
          >
            + Add Step
          </button>
        </div>
        
        <div className="form-group">
          <label>Categories</label>
          <div className="categories-select">
            {['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Vegetarian', 'Vegan'].map(category => (
              <label key={category} className="category-option">
                <input
                  type="checkbox"
                  checked={categories.includes(category)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setCategories([...categories, category]);
                    } else {
                      setCategories(categories.filter(c => c !== category));
                    }
                  }}
                />
                {category}
              </label>
            ))}
          </div>
        </div>
        
        <button type="submit" className="submit-btn">Save Recipe</button>
      </form>
    </div>
  );
}

export default RecipeForm;