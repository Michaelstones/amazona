import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
// import data from "../data";

function HomeScreen() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("/api/products");
      console.log(res.data.products);
      setProducts(res.data.products);
    };
    fetchData();
  }, []);
  return (
    <div>
      <h1>Featured products</h1>
      <div className="products">
        {products.map((item) => {
          return (
            <div className="product" key={item.slug}>
              <Link to={`/product/${item.slug}`}>
                <img src={item.images} alt={item.name} />
              </Link>
              <div className="product-info">
                <Link to={`/product/${item.slug}`}>
                  <p>{item.name}</p>
                </Link>
                <strong>
                  <p>${item.price}</p>
                </strong>
                <button>add to cart</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HomeScreen;
