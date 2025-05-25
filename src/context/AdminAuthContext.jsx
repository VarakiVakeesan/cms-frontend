import React, { createContext, useState, useContext } from "react";

// For demo: persist in-memory, not localStorage (change as needed)
const AdminAuthContext = createContext();

export function AdminAuthProvider({ children }) {
  const [authToken, setAuthToken] = useState(null);

  function login(username, password) {
    // For HTTP Basic Auth, token is 'Basic base64(username:password)'
    const basicToken = "Basic " + btoa(`${username}:${password}`);
    setAuthToken(basicToken);
  }

  function logout() {
    setAuthToken(null);
  }

  return (
    <AdminAuthContext.Provider value={{ authToken, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  return useContext(AdminAuthContext);
}