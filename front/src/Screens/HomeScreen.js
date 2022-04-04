import React, { useEffect, useReducer, useState } from "react";
import axios from "axios";
import logger from "use-reducer-logger";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Product from "../Component/Product";
import { Helmet } from "react-helmet-async";
import LoadingBox from "../Component/LoadingBox";
import MessageBox from "../Component/MessageBox";
import { getError } from "../util";
// import data from "../data";

function HomeScreen() {
  const reducer = (state, action) => {
    switch (action.type) {
      case "FETCH_REQUEST":
        return { ...state, loading: true };
      case "FETCH_SUCCESS":
        return { ...state, products: action.payload, loading: false };
      case "FETCH_FAIL":
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };

  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    products: [],
    loading: true,
    error: "",
  });
  // const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const res = await axios.get("/api/products");
        dispatch({ type: "FETCH_SUCCESS", payload: res.data.products });
      } catch (error) {
        dispatch({ type: "FETCH_FAIL", payload: getError(error) });
      }
      // console.log(res.data.products);
      // setProducts(res.data.products);
    };
    fetchData();
  }, []);
  return (
    <div>
      <Helmet>
        <title>amazona</title>
      </Helmet>
      <h1>Featured products</h1>
      <div className="products">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <Row>
            {products.map((product) => {
              return (
                <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
                  <Product product={product}></Product>
                </Col>
              );
            })}
          </Row>
        )}
      </div>
    </div>
  );
}

export default HomeScreen;
