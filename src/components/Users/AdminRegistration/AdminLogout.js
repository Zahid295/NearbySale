import React from 'react';
import { useHistory } from 'react-router-dom';

const AdminLogout = () => {
  const history = useHistory();

  const handleLogout = () => {
    // Clear tokens or session data (For example, from local storage)
    // Redirect to the login page
    history.push('/admin/login');
  };

  return (
    <div>
      <h2>Admin Logout</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default AdminLogout;
