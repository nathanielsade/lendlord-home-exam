import React, { useState, useEffect } from 'react';
import './styles.css'; 

const UserForm = ({ fetchUsers, closeModal, currentUser }) => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dateStarted: '',
    role: '',
    salary: '',
    manager: ''
  });

  useEffect(() => {
    if (currentUser) {
      setUser(currentUser);
    } else {
      setUser({
        firstName: '',
        lastName: '',
        email: '',
        dateStarted: '',
        role: '',
        salary: '',
        manager: ''
      });
    }
  }, [currentUser]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = currentUser ? `http://localhost:3000/user/${currentUser._id}` : 'http://localhost:3000/user';
    const method = currentUser ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        const error = await response.json();
        alert(error.message);
        return;
      }

      await fetchUsers();
      closeModal(); // Close the modal after saving the user
    } catch (error) {
      console.error('Error saving user', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="firstName" value={user.firstName} onChange={handleChange} placeholder="First Name" required />
      <input name="lastName" value={user.lastName} onChange={handleChange} placeholder="Last Name" required />
      <input name="email" value={user.email} onChange={handleChange} placeholder="Email" required />
      <input name="dateStarted" type="date" value={user.dateStarted} onChange={handleChange} placeholder="Date Started" required />
      <input name="role" value={user.role} onChange={handleChange} placeholder="Role" required />
      <input name="salary" type="number" value={user.salary} onChange={handleChange} placeholder="Salary" required />
      <input name="manager" value={user.manager} onChange={handleChange} placeholder="Manager" />
      <button type="submit">Save</button>
    </form>
  );
};

export default UserForm;
