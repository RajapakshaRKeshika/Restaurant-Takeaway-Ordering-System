import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './add_admin.css'; 
import AdminNavigation from '../admin_navigation/admin_navigation';

const AddUsers = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState(''); 
    const [isLoading, setIsLoading] = useState(false); 
    const [users, setUsers] = useState([]); 
    const [userEdits, setUserEdits] = useState({}); 

    const handleFormSubmit = async (e) => {
        e.preventDefault(); 
        try {
 
          const userData = {
            email: email,
            password: password
    
          };
    

          const response = await fetch('http://localhost:5000/admin/add/user', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
             
            },
            body: JSON.stringify(userData),
          });
    
   
          if (!response.ok) {
            throw new Error('Failed to add user');
          }
          const result = await response.json();
          setSuccessMessage('User added successfully!');
          console.log(result);
   
          setEmail('');
          setPassword('');

        } catch (error) {
          console.error('Error adding user', error);
          setSuccessMessage('Failed to add user');
        }
      };


      const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'email') {
          setEmail(value);
        } else if (name === 'password') {
          setPassword(value);
        }

      };

      useEffect(() => {
        const fetchUsers = async () => {
          setIsLoading(true);
          try {
            const response = await fetch('http://localhost:5000/admin/staff');
            if (!response.ok) {
              throw new Error('Could not fetch users');
            }
            const data = await response.json();
            setUsers(data);
          } catch (error) {
            setError(error.message);
          }
          setIsLoading(false);
        };
    
        fetchUsers();
      }, []);
    



      const handleEmailChange = (newValue, userId) => {
        setUserEdits({ ...userEdits, [userId]: newValue });
      };
      


      const handleUpdate = async (userId) => {
        const updatedEmail = userEdits[userId];
        if (!updatedEmail) {
          console.error('No changes made to the email or email is invalid');
          return;
        }
        try {
          setIsLoading(true);
          const response = await fetch(`http://localhost:5000/admin/staff/${userId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: updatedEmail }),
          });
          if (!response.ok) {
            throw new Error('Could not update user email');
          }
          setUsers(users.map(user => user._id === userId ? { ...user, email: updatedEmail } : user));
          setUserEdits(prevEdits => ({ ...prevEdits, [userId]: undefined }));
        } catch (error) {
          setError(error.message);
        } finally {
          setIsLoading(false);
        }
      };

      const handleDelete = async (userId) => {
        if (!window.confirm('Are you sure you want to delete this user?')) {
          return;
        }
        try {
          setIsLoading(true);
          const response = await fetch(`http://localhost:5000/admin/staff/${userId}`, {
            method: 'DELETE',
          });
          if (!response.ok) {
            throw new Error('Could not delete the user');
          }
          setUsers(users.filter(user => user._id !== userId));
        } catch (error) {
          setError(error.message);
        } finally {
          setIsLoading(false);
        }
      };

  return (
   <>
   <AdminNavigation/>
   <div className="admin-page">

      

<div className="admin-content">
  <div className="admin-form">
    {}
    <h2>Add New Admin</h2>
    <form onSubmit={handleFormSubmit}>
      <div className="form-field">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-field">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={handleInputChange}
          required
        />
      </div>
      <button type="submit" className="submit-btn">Add Admin</button>
      {successMessage && <div className="success-message">{successMessage}</div>}
    </form>
  </div>

  <div className="admin-users">
    {error && <div className="error-message">{error}</div>}
    {isLoading ? <div>Loading users...</div> : (
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>
                <input
                  type="text"
                  value={userEdits[user._id] || user.email}
                  onChange={(e) => handleEmailChange(e.target.value, user._id)}
                />
              </td>
              <td>
                <button onClick={() => handleUpdate(user._id)}>Update</button>
                <button onClick={() => handleDelete(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
</div>
</div>
   </>
  );
};

export default AddUsers;
