import React, { useContext,useState,useEffect } from "react";
import { Navigate } from "react-router-dom";
import { AdminAuth } from "../context/adminAuth";

const ProtectedRoute = ({ element, allowedRoles }) => {
  const ctx = useContext(AdminAuth);
  const [isLoginAdmin, setIsLoginAdmin] = useState(false);
  const [userRole, setUserRole] = useState("");
  // console.log(ctx);
  // console.log("ProtectedRoute - isLoginAdmin:", ctx.isLoginAdmin);
  // console.log("ProtectedRoute - userRole:", ctx.userRole);

  useEffect(() => {
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
  
    
  }, [])
  

  if (!isLoginAdmin || !allowedRoles.includes(userRole)) {
    return <Navigate to="/admin" />;
  }

  return element;
};

export default ProtectedRoute;
