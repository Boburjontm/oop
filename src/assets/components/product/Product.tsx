// src/components/products/Product.tsx

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

interface ProductProps {
  id: string;
  title: string;
  description: string;
  price: number;
  images: { color: string; images: string[] }[];
  // Boshqa kerakli maydonlarni qo'shing
}

const Product: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductProps | null>(null);

  useEffect(() => {
    // Yangi API manzili
    const newApiUrl = `https://66f115e341537919154f732a.mockapi.io/products/${id}`; // O'zingizning API manzilingizni kiriting

    axios
      .get(newApiUrl)
      .then((response) => setProduct(response.data))
      .catch((error) => console.error("Error fetching product:", error));
  }, [id]);

  if (!product) {
    return <div>Loading...</div>; // Mahsulot yuklanayotganda
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold">{product.title}</h1>
      <img src={product.images[0].images[0]} alt={product.title} className="w-full h-auto my-4" />
      <p className="text-lg">{product.description}</p>
      <p className="text-xl font-semibold mt-4">Price: ${product.price}</p>
      {/* Boshqa ma'lumotlarni qo'shing */}
    </div>
  );
};

export default Product;
