import React from "react";
import Cookie from "js-cookie";

import { AuthContext } from "../context";

export const StoreProvider = ({ children }) => {
  const contextValue = {
    login: token => {
      Cookie.set("token", token);
    },
    logout: () => {
      Cookie.remove("token");
    },
    isLoggedIn: Cookie.get("token") && Cookie.get("token") !== ""
  };
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
