import "./App.css";
import { routes } from "./routers/index";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { ChakraProvider } from "@chakra-ui/react";
import { AdminAuth } from "./context/adminAuth";
import { useState } from "react";

const theme = createTheme();
const router = createBrowserRouter(routes);

function App() {
  const [isLoginAdmin, setIsLoginAdmin] = useState(false);

  const [userRole, setUserRole] = useState(''); 

  const authContextValue = {
    isLoginAdmin,
    setIsLoginAdmin,
    userRole,
    setUserRole
  };

  return (
    <>
      <AdminAuth.Provider value={authContextValue}>
        <ThemeProvider theme={theme}>
          <RouterProvider router={router} />
        </ThemeProvider>
      </AdminAuth.Provider>
    </>
  );
}

export default App;
