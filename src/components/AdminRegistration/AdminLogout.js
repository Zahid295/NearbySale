import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogout = () => {
  const history = useNavigate();

  const handleLogout = () => {
    // Clear tokens or session data (For example, from local storage)
    // Redirect to the login page
    history.push('/login');
  };

  return (
    <div>
      <h2>Admin Logout</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default AdminLogout;
