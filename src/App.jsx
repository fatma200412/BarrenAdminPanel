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
  let name = "fatma";
  let surname = "quliyeva";

  const [isLoginAdmin, setIsLoginAdmin] = useState(false);

  let data = [name, surname, isLoginAdmin, setIsLoginAdmin];

  return (
    <>
      <AdminAuth.Provider value={data}>
        <ThemeProvider theme={theme}>
          <RouterProvider router={router} />
        </ThemeProvider>
      </AdminAuth.Provider>
    </>
  );
}

export default App;
