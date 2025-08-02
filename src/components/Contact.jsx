function Contact() {
  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <div className="contact-content">
        <div className="contact-info">
          <h2>Get in Touch</h2>
          <p>Have questions or feedback? We'd love to hear from you!</p>
          
          <div className="contact-method">
            <h3>Email</h3>
            <p>support@recipenest.com</p>
          </div>
          
          <div className="contact-method">
            <h3>Phone</h3>
            <p>+1 (555) 123-4567</p>
          </div>
          
          <div className="contact-method">
            <h3>Address</h3>
            <p>123 Foodie Lane, Culinary City, CC 98765</p>
          </div>
        </div>
        
        <form className="contact-form">
          <div className="form-group">
            <label>Name</label>
            <input type="text" required />
          </div>
          
          <div className="form-group">
            <label>Email</label>
            <input type="email" required />
          </div>
          
          <div className="form-group">
            <label>Message</label>
            <textarea required></textarea>
          </div>
          
          <button type="submit" className="submit-button">Send Message</button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
