import React, { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Axios from "axios";
import { Store } from "../Store";
import { toast } from "react-toastify";
import { getError } from "../util";

function SiginScreen() {
  const { search } = useLocation();
  const navigate = useNavigate();
  const redirectINUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectINUrl ? redirectINUrl : "/";

  const { state, dispatch: ctxDispatch } = useContext(Store);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await Axios.post("/api/users/signin", {
        email,
        password,
      });
      ctxDispatch({ type: "USER_SIGNIN", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate(redirect || "/");
    } catch (err) {
      toast.error(getError(err));
    }
  };
  return (
    <Container className="sm-container">
      <Helmet>
        <title className="my-3">Sign In</title>
      </Helmet>
      <h1>Sign In </h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <div className="mb-3">
          <Button type="submit">Sign In</Button>
        </div>
        <div className="mb-3">
          New Customer?{" "}
          <Link to={`/signin?redirect=${redirect}`}>Create your account</Link>
        </div>
      </Form>
    </Container>
  );
}

export default SiginScreen;
