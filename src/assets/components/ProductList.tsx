// src/components/products/ProductList.tsx

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

interface ProductProps {
  id: string;
  title: string;
  description: string;
  price: number;
  images: { color: string; images: string[] }[];
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductProps | null>(null);

  // Mahsulotlar ro'yxatini yuklash
  useEffect(() => {
    const fetchProducts = async () => {
      const newApiUrl = `https://66f115e341537919154f732a.mockapi.io/products`;
      try {
        const response = await axios.get(newApiUrl);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Agar mahsulot IDsi mavjud bo'lsa, o'sha mahsulotni yuklash
  useEffect(() => {
    if (id) {
      const selectedProduct = products.find((p) => p.id === id) || null;
      setProduct(selectedProduct);
    }
  }, [id, products]);

  // Agar faqat mahsulotlarni ko'rsatish
  if (!product) {
    return (
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Mahsulotlar</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <div key={product.id} className="border rounded-lg p-4">
              <img src={product.images[0].images[0]} alt={product.title} className="w-full h-auto" />
              <h2 className="text-xl font-semibold">{product.title}</h2>
              <p>{product.description}</p>
              <p className="text-lg font-bold">${product.price}</p>
              <Link to={`/products/${product.id}`} className="text-blue-500 hover:underline">Ko'proq ma'lumot</Link>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Agar maxsus mahsulotni ko'rsatish
  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold">{product.title}</h1>
      <p>{product.description}</p>
      <p className="text-lg font-bold">Narxi: ${product.price}</p>
      <img src={product.images[0].images[0]} alt={product.title} className="w-full h-auto" />
      {/* Boshqa ma'lumotlarni qo'shing */}
    </div>
  );
};

export default ProductList;
