import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

axios.defaults.baseURL =
  process.env.NODE_ENV === "development" ? "http://localhost:3000/" : "https://realm-roster-api.onrender.com/";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
