import React, { useState } from "react";
import Cookie from "js-cookie";

import { AuthContext } from "../context";

export const StoreProvider = ({ children, token: initialToken }) => {
  const [token, setToken] = useState(initialToken);
  const [email, setEmail] = useState(Cookie.get("email"));
  const contextValue = {
    login: (newToken, newEmail) => {
      setToken(newToken);
      setEmail(newEmail);
      Cookie.set("token", newToken);
      Cookie.set("email", newEmail);
    },
    logout: () => {
      Cookie.remove("token");
      Cookie.remove("email");
      setToken("");
      setEmail("");
    },
    isLoggedIn: !!token,
    email: email
  };
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};