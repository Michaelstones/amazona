import React, { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { Store } from "../Store";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import MessageBox from "../Component/MessageBox";
import { Link, Navigate, useNavigate } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import axios from "axios";

function CartScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);

  const {
    cart: { cartItems },
  } = state;
  const updateItem = async (item, Quantity) => {
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
  const removeItem = (item) => {
    ctxDispatch({ type: "REMOVE_ITEM", payload: item });
  };
  const checkOut = () => {
    navigate("/signin?redirect=/shipping");
  };
  return (
    <div>
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>
      <h1>Shopping Cart</h1>
      <Row>
        <Col md={8}>
          {cartItems.length === 0 ? (
            <MessageBox>
              Cart is Empty. <Link to="/">Go Shopping</Link>
            </MessageBox>
          ) : (
            <ListGroup>
              {cartItems.map((item) => (
                <ListGroup.Item key={item._id}>
                  <Row className="align-items-center">
                    <Col md={4}>
                      <img
                        src={item.images}
                        alt={item.name}
                        className="img-fluid rounded img-thumbnail"
                      ></img>{" "}
                      <Link to={`/product/${item.slug}`}>{item.name}</Link>
                    </Col>
                    <Col md={3}>
                      <Button
                        variant="light"
                        disabled={item.Quantity === 1}
                        onClick={() => updateItem(item, item.Quantity - 1)}
                      >
                        <i className="fas fa-minus-circle"></i>
                      </Button>{" "}
                      <span>{item.Quantity}</span>{" "}
                      <Button
                        variant="light"
                        disabled={item.Quantity === item.countInstock}
                        onClick={() => updateItem(item, item.Quantity + 1)}
                      >
                        <i className="fas fa-plus-circle"></i>
                      </Button>
                    </Col>
                    <Col md={3}>{item.price}</Col>
                    <Col md={2}>
                      <Button
                        onClick={() => removeItem(item)}
                        variant="light"
                        disabled={item.Quantity === item.countInstock}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>{" "}
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <ListGroup>
                <ListGroup.Item variant="flush">
                  <h3>
                    Subtotal ({cartItems.reduce((a, b) => a + b.Quantity, 0)}{" "}
                    items) : {"  "}$
                    {cartItems.reduce((a, b) => a + b.price * b.Quantity, 0)}
                  </h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                      type="button"
                      onClick={checkOut}
                      variant="primary"
                      disabled={cartItems.length === 0}
                    >
                      proceed to checkout
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default CartScreen;
