import React, { useState, useEffect } from 'react';
import './view_contact.css'; 
import AdminNavigation from '../admin_navigation/admin_navigation';

const MessagesPage = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
  
    const fetchMessages = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/messages'); // Your API endpoint
        if (!response.ok) throw new Error('Failed to fetch messages');
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);


  if (loading) {
    return <p>Loading messages...</p>;
  }
  const updateMessage = async (id, updatedEmail) => {
    try {
      const response = await fetch(`http://localhost:5000/api/messages/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: updatedEmail }),
      });

      if (!response.ok) {
        throw new Error('Could not update message.');
      }

      const updatedMessage = await response.json();

  
      setMessages((prevMessages) =>
        prevMessages.map((message) =>
          message._id === id ? { ...message, email: updatedEmail } : message
        )
      );
      

      setSuccessMessage('Email updated successfully.');

   
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);

   
      fetchMessages();

    } catch (error) {
      console.error('Error updating message:', error);

      setSuccessMessage('Email updated successfully.');
    }
  };
const deleteMessage = async (id) => {
    try {
   
      const response = await fetch(`http://localhost:5000/api/messages/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
     
        throw new Error('Could not delete message.');
      }
  
   
      setMessages((prevMessages) =>
        prevMessages.filter((message) => message._id !== id)
      );
      alert('Message deleted successfully.');
    } catch (error) {
      console.error('Error deleting message:', error);
      alert('Failed to delete message.');
    }
  };
  return (
     <> <AdminNavigation />
     <h1>Messages</h1>
     {
  successMessage && <div className="success-alert">{successMessage}</div>
}
     <ul className="message-list">
       {messages.map((message) => (
         <MessageItem 
           key={message._id} 
           message={message} 
           updateMessage={updateMessage} 
           deleteMessage={deleteMessage} 
         />
       ))}
     </ul>
     </>
  );
};


const MessageItem = ({ message, updateMessage, deleteMessage }) => (
  <li className="message-item">
    <p><strong>Name:</strong> {message.name}</p>
    <input 
      type="text" 
      defaultValue={message.email} 
      onBlur={(e) => updateMessage(message._id, e.target.value)}
    />
    <p><strong>Message:</strong> {message.message}</p>
    <button onClick={() => updateMessage(message._id)}>Update</button>
    <button onClick={() => deleteMessage(message._id)}>Delete</button>
  </li>
);

export default MessagesPage;
