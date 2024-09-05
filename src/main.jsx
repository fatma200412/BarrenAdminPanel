import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { store } from "./redux/store.js";
import { Provider } from "react-redux";
import { AdminAuthProvider } from "./context/adminAuth.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <BrowserRouter>
  //   <React.Fragment>

  //   </React.Fragment>
  // </BrowserRouter>
  <AdminAuthProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </AdminAuthProvider>
);
