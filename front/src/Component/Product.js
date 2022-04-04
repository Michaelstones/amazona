import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Rating from "./Rating";

function Product(props) {
  const { product } = props;
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
        <Button>add to cart</Button>
      </Card.Body>
    </Card>
  );
}

export default Product;
