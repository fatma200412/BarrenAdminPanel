import React, { createContext, useState, useEffect } from "react";

export const AdminAuth = createContext();

export const AdminAuthProvider = ({ children }) => {
  const [isLoginAdmin, setIsLoginAdmin] = useState(false);
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    // debugger;
    // debugger;
    const storedIsLoginAdmin = localStorage.getItem("isLoginAdmin") === "true";
    const storedUserRole = localStorage.getItem("userRole");

    console.log("Stored isLoginAdmin:", storedIsLoginAdmin);
    console.log("Stored userRole:", storedUserRole);

    //     if (storedIsLoginAdmin) {
    //       setIsLoginAdmin(true);
    //     }

    //     if (storedUserRole) {
    //       setUserRole(storedUserRole);
    //     }

    setIsLoginAdmin(storedIsLoginAdmin);
    setUserRole(storedUserRole);
  }, []);

  console.log(isLoginAdmin);
  return (
    <AdminAuth.Provider
      value={{ isLoginAdmin, setIsLoginAdmin, userRole, setUserRole }}
    >
      {children}
    </AdminAuth.Provider>
  );
};
