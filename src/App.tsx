// src/App.tsx

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./assets/home/Home"; // Home sahifasi
import ProductList from "./assets/components/ProductList"; // Mahsulotlar sahifasi

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductList />} /> {/* Maxsus mahsulot */}
      </Routes>
    </Router>
  );
}

export default App;
