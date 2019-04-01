import React, { useState } from "react";

import { AuthContext } from "../context";

export const StoreProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const contextValue = {
    token,
    login: token => {
      setToken(token);
    },
    logout: () => {
      setToken(null);
    },
    isLoggedIn: token !== null
  };
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
