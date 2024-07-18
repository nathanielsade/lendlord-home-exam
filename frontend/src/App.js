import React, { useState, useEffect } from 'react';
import './App.css';
import GenericModal from './components/modal';
import Header from './components/header';
import UserTable from './components/userTable';
import UserForm from './components/userForm';

function App() {
  const [shown, setShown] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);

  const toggleModal = (user = null) => {
    setCurrentUser(user);
    setShown(prev => !prev);
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:3000/users', {
        method: 'GET'
      });
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="App">
      <Header />
      <div id="content">
        <button onClick={() => toggleModal()}>Add User</button>
        <UserTable toggleModal={toggleModal} users={users} fetchUsers={fetchUsers} />
        <GenericModal displayModal={shown} closeModal={toggleModal}>
          <UserForm fetchUsers={fetchUsers} closeModal={toggleModal} currentUser={currentUser} />
        </GenericModal>
      </div>
    </div>
  );
}

export default App;
