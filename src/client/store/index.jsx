import React, { useState } from "react";
import Cookie from "js-cookie";

import { AuthContext } from "../context";

export const StoreProvider = ({ children, token: initialToken }) => {
  const [token, setToken] = useState(initialToken);
  const [id, setId] = useState(Cookie.get("id"));
  const contextValue = {
    login: (newToken, newId) => {
      setToken(newToken);
      setId(newId);
      Cookie.set("token", newToken);
      Cookie.set("id", newId);
    },
    logout: () => {
      Cookie.remove("token");
      Cookie.remove("id");
      setToken("");
      setId("");
    },
    isLoggedIn: !!token,
    id: id
  };
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
