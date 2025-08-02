import React from 'react';

function About() {
  return (
    <div className="about-page">
      <div className="about-container">
        <h1 className="about-title">About Recipe Nest</h1>
        <div className="about-section">
          <div className="about-text">
            <h2>Our Story</h2>
            <p>
              Welcome to Recipe Nest, your go-to destination for discovering,
              sharing, and celebrating delicious recipes from around the world. 
              We believe that cooking is an art, and our mission is to bring people 
              together through the joy of food.
            </p>
            <p>
              Founded in 2023, Recipe Nest started as a small collection of family 
              recipes and has since evolved into a vibrant community of passionate food lovers.
            </p>
          </div>
          <div className="about-image-container">
            <img
              src="https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505"  // Replace with your image path
              alt="About-Image"
              className="about-image"
            />
          </div>
        </div>
        <div className="about-section">
          <h2>Our Mission</h2>
          <p>
            Our mission is simple: to make cooking accessible and enjoyable for everyone, 
            whether you're a beginner or a seasoned chef. We aim to provide easy-to-follow 
            recipes that inspire you to create memorable meals with your loved ones.
          </p>
          <p>
            At Recipe Nest, we believe in the power of food to bring people together, 
            and we’re committed to fostering a community where you can share and learn 
            from each other’s culinary experiences.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
