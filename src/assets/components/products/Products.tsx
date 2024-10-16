import axios from "axios";
import { Component } from "react";
import { Link } from "react-router-dom";

interface ProductPropTypes {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice: number;
  discount: {
    value: number;
    percentage: number;
  };
  status: string;
  category: {
    primary: string;
    secondary: string;
  };
  sku: string;
  stock: {
    [color: string]: number; // Dynamic keys for color and stock quantity
  };
  images: {
    color: string;
    images: string[];
  }[];
  reviews: {
    totalReviews: number;
    comments: {
      user: string;
      profileImg: string;
      comment: string;
      rating: number;
    }[];
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    slug: string;
  };
  timestamps: {
    createdAt: string; // ISO 8601 date string
    updatedAt: string; // ISO 8601 date string
  };
  additional_infos: {
    measurements: {
      width: number;
      depth: number;
      unit: string;
    };
    weight: {
      value: number;
      unit: string;
    };
  };
}

interface PropTypes {
  data: ProductPropTypes[];
  limit: number;
}

export default class Products extends Component<{}, PropTypes> {
  constructor(props: any) {
    super(props);
    this.state = {
      data: [],
      limit: 8,
    };
  }

  componentDidMount(): void {
    axios
      .get("https://fakestoreapi.com/products") // O'zgarish: API manzilini yangilang
      .then((data) => this.setState({ data: data.data }));
  }

  getCategories(): JSX.Element {
    const categories = Array.from(new Set(this.state.data.map((product) => product.category.primary))); // Kategoriyalarni olish
    return (
      <div className="categories">
        <h2 className="text-center text-2xl my-8 text-green-400">Categories</h2>
        <div className="grid grid-cols-3 gap-4">
          {categories.map((category, idx) => (
            <Link to={`/category/${category}`} key={idx} className="category-link">
              <div className="category p-4 border border-gray-200 rounded shadow text-center">
                <h3 className="text-lg font-semibold">{category}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  getProductsByCategory(category: string): JSX.Element {
    const filteredProducts = this.state.data.filter(product => product.category.primary === category);
    
    return (
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredProducts.length === 0 ? (
          <div>No products found in this category.</div>
        ) : (
          filteredProducts.slice(0, this.state.limit).map((product: ProductPropTypes) => (
            <div className="product p-2" key={product.id}>
              <div className="product__images relative group">
                <span className="status py-1 px-2 text-sm font-medium tracking-widest absolute inset-[4%_auto_auto_4%] bg-white rounded-lg">
                  {product.status === "New" && "NEW"}
                </span>
                <img
                  src={product.images[0].images[0]}
                  alt="product img"
                  className="rounded-md"
                />
              </div>
              <div className="product__info mt-3 mb-7 grid gap-1 text-sm text-start font-medium">
                <div className="product__info--stars flex-center justify-start gap-1 text-sm text-slate-800"></div>
                <h4 className="product__title">
                  <Link to={`/product/${product.id}`}>{product.title}</Link> {/* Mahsulot sahifasiga havola */}
                </h4>
                <p className="product__price">${product.price}</p>
              </div>
            </div>
          ))
        )}
      </div>
    );
  }

  render() {
    return (
      <div className="max-w-7xl mx-auto">
        {this.getCategories()}
        {this.getProductsByCategory("men's clothing")} {/* Dastlabki kategoriya */}
      </div>
    );
  }
}
