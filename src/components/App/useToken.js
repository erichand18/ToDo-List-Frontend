import { useState } from 'react';

// Custom hook to save and fetch the token from sessionStorage
// Gives benefit of redirecting the user after login while still
// taking advantage of sessionStorage
function useToken() {
  // Fetch the token from sessionStorage
  const getToken = () => {
    return sessionStorage.getItem('token');
  };

  // Use useState to trigger component render on call to setToken
  const [token, setToken] = useState(getToken());

  // Save the token in sessionStorage and call the useState hook
  const saveToken = token => {
    sessionStorage.setItem('token', token);
    setToken(token);
  };

  return {
    token,
    setToken: saveToken,
  }
}

export default useToken;