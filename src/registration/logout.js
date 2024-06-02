import React from 'react';

const Logout = () => {
  const logout = () => {
    // Delete the token from local storage
    localStorage.removeItem('token');
    // Direct the user to the login page
    window.location = '/login';
  };

  return (
    <button onClick={logout}>Logout</button>
  );
};

export default Logout;
