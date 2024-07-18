import React from 'react';
import './styles.css'; 
const UserTable = ({ toggleModal, users, fetchUsers }) => {

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3000/user/${id}`, {
        method: 'DELETE'
      });
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user', error);
    }
  };

  return (
    <table>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Date Started</th>
          <th>Role</th>
          <th>Salary</th>
          <th>manager</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user._id}>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.email}</td>
            <td>{new Date(user.dateStarted).toLocaleDateString()}</td>
            <td>{user.role}</td>
            <td>{user.salary}</td>
            <td>{user.manager ? `${user.manager.firstName} ${user.manager.lastName}` : 'N/A'}</td>
            <td>
              <button onClick={() => toggleModal(user)}>Edit</button>
              <button onClick={() => handleDelete(user._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
