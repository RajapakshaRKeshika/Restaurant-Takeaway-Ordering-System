import React, { useState, useEffect } from 'react';
import './contact.css'; 
import NavigationBar from '../../components/navigation/navigation';
import Footer from '../../components/footer/footer';

const ContactUsPage = () => {
    const [serverResponse, setServerResponse] = useState('');
    const [ws, setWs] = useState(null);
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      message: '',
    });

    useEffect(() => {
    
        const newWebSocket = new WebSocket('ws://localhost:8080');
        setWs(newWebSocket);
    
        newWebSocket.onmessage = (event) => {
          const response = JSON.parse(event.data);
          setServerResponse(response.message);
          if (response.message === 'Message sent successfully') {
         
            console.log('Server response:', response.data);
          } else {
   
            console.error('Error from server:', response.error);
          }
        };
    
        newWebSocket.onerror = (event) => {
          console.error('WebSocket error:', event);
        };
    
 
        return () => {
          newWebSocket.close();
        };
      }, []);
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
    
   
    
        if (ws && ws.readyState === WebSocket.OPEN) {
         
          ws.send(JSON.stringify(formData));
        } else {
          setServerResponse('WebSocket connection is not open. Please try again later.');
        }
    
        setFormData({
          name: '',
          email: '',
          message: '',
        });
      };
  return (
    <>
      <NavigationBar />
      <div className="contact-us-background">
        <div className="contact-us-card">
          <h1 className="contact-us-title">Get in Touch</h1>
          {serverResponse && <p className="server-response">{serverResponse}</p>}
          <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="textarea">Message:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            className='textarea'
          />
        </div>
        <button type="submit" className="submit-button">Send Message</button>
      </form>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default ContactUsPage;
