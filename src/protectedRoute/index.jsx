import React, { useContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { AdminAuth } from "../context/adminAuth";

const ProtectedRoute = ({ element, allowedRoles }) => {
  const { isLoginAdmin: contextIsLoginAdmin, userRole: contextUserRole } =
    useContext(AdminAuth);
  const [isLoginAdmin, setIsLoginAdmin] = useState(null); // Default as null to check later
  const [userRole, setUserRole] = useState("");
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    // debugger;
    // Fetch the login state and role from localStorage
    const storedIsLoginAdmin = localStorage.getItem("isLoginAdmin") === "true";
    const storedUserRole = localStorage.getItem("userRole");

    // Update state with the values from localStorage
    setIsLoginAdmin(storedIsLoginAdmin);
    setUserRole(storedUserRole || "");

    // Stop loading after values are set
    setLoading(false);

    console.log("isLoginAdmin from localStorage:", storedIsLoginAdmin);
    console.log("userRole from localStorage:", storedUserRole);
  }, []);

  // While loading, don't render anything
  if (loading) {
    return <div>Loading...</div>; // You can replace this with a spinner or your custom loader
  }

  // If the user is not logged in or their role is not allowed, redirect to the login page
  if (!isLoginAdmin || !allowedRoles.includes(userRole)) {
    return <Navigate to="/login" />;
  }

  // If logged in and role matches, render the element
  return element;
};

export default ProtectedRoute;
