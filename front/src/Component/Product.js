import React, { useContext } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import { Store } from "../Store";
import axios from "axios";

function Product(props) {
  const { product } = props;
  const { state, dispatch: ctxDispatch } = useContext(Store);

  const {
    cart: { cartItems },
  } = state;
  const handlecartClick = async (item) => {
    const ItemExist = cartItems.find((item) => item._id === product._id);
    const Quantity = ItemExist ? ItemExist.Quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInstock < Quantity) {
      window.alert("Sorry, Product out of Stock");
      return;
    }
    ctxDispatch({
      type: "ADD_TO_CART",
      payload: { ...item, Quantity },
    });
  };
  return (
    <Card className="product">
      <Link to={`/product/${product.slug}`}>
        <img src={product.images} alt={product.name} />
      </Link>
      <Card.Body>
        <Link to={`/product/${product.slug}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Rating
          rating={product.rating}
          numReviews={product.numReviews}
        ></Rating>
        <Card.Text>${product.price}</Card.Text>
        {product.countInstock === 0 ? (
          <Button variant="light" disabled>
            Out of Stock
          </Button>
        ) : (
          <Button onClick={() => handlecartClick(product)}>add to cart</Button>
        )}
      </Card.Body>
    </Card>
  );
}

export default Product;
