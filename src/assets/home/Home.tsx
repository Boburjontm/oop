// src/home/Home.tsx

import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div className="text-center mt-10">
      <h1 className="text-4xl font-bold">Xush kelibsiz!</h1>
      <p className="mt-4">Mahsulotlar bo'limiga o'tish uchun quyidagi tugmani bosing:</p>
      <Link to="/products" className="mt-6 inline-block px-4 py-2 bg-blue-500 text-white rounded">
        Mahsulotlarni ko'rish
      </Link>
    </div>
  );
};

export default Home;
