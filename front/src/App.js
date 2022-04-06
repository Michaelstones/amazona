import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import HomeScreen from "./Screens/HomeScreen";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductScreen from "./Screens/ProductScreen";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { LinkContainer } from "react-router-bootstrap";
import Badge from "react-bootstrap/Badge";
import NavDropDown from "react-bootstrap/NavDropdown";
import { useContext } from "react";
import { Store } from "./Store";
import CartScreen from "./Screens/CartScreen";
import SiginScreen from "./Screens/SiginScreen";
function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
  };
  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        <ToastContainer position="bottom-center" limit={1} />
        <header>
          <Navbar bg="dark" variant="dark">
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand>amazona</Navbar.Brand>
              </LinkContainer>
              <Nav className="me-auto">
                <Link to="/cart" className="nav-link">
                  Cart
                  {cart.cartItems.length > 0 && (
                    <Badge pill bg="danger">
                      {cart.cartItems.reduce((a, b) => a + b.Quantity, 0)}
                    </Badge>
                  )}
                </Link>
                {userInfo ? (
                  <NavDropDown title={userInfo.name} id="basic-nav-dropdown">
                    <LinkContainer to="/profile">
                      <NavDropDown.Item>User Profile</NavDropDown.Item>
                    </LinkContainer>
                    <LinkContainer to="/orderhistory">
                      <NavDropDown.Item>Order History</NavDropDown.Item>
                    </LinkContainer>
                    <NavDropDown.Divider />
                    <Link
                      to="#signout"
                      className="dropdown-item"
                      onClick={signoutHandler}
                    >
                      Sign Out
                    </Link>
                  </NavDropDown>
                ) : (
                  <Link className="nav-link" to="/signin">
                    Sign In
                  </Link>
                )}
              </Nav>
            </Container>
          </Navbar>
        </header>
        <main>
          <Container className="mt-3">
            <Routes>
              <Route exact path="/product/:slug" element={<ProductScreen />} />
              <Route exact path="/" element={<HomeScreen />} />
              <Route exact path="/cart" element={<CartScreen />} />
              <Route exact path="/signin" element={<SiginScreen />} />
            </Routes>
          </Container>
        </main>
        <footer className="text-center">All right reserved</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
