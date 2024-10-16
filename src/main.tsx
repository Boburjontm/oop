// src/index.tsx

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // CSS faylini import qilish (agar kerak bo'lsa)

const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
