import { Navbar, Container, Image, NavDropdown, Badge } from "react-bootstrap";
import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { OrderContext } from "../context/orderContext";
import { API } from "../config/api";

import "bootstrap/dist/css/bootstrap.min.css";
import "../style/style.css";

import Register from "../components/Register";
import Login from "../components/Login";
// import User from "../components/UserNav";

import potoUser from "../image/Ellipse 1.png";
import Logo from "../image/Icon.png";
import basket from "../image/Vector.png";
import user from "../image/user 2.png";
import out from "../image/logout 1.png";

export default function NavbarUser() {
  const [state, dispatch] = useContext(UserContext);

  let navigate = useNavigate();

  if (!state.isLogin) {
    // navigate("/");
  } else if (state.user.role === "partner") {
    navigate("/income-trs");
  } else if (state.user.role === "user") {
  }

  const [showRegister, setShowRegister] = useState(false);
  const registerClose = () => setShowRegister(false);
  const registerShow = () => setShowRegister(true);

  const [showLogin, setShowLogin] = useState(false);
  const loginClose = () => setShowLogin(false);
  const loginShow = () => setShowLogin(true);

  const { orderMenus, setOrderMenus } = useContext(OrderContext);

  const logout = () => {
    console.log(state);
    dispatch({
      type: "LOGOUT",
    });
    navigate("/");
  };

  const [profile, setProfile] = useState({});

  // Fetching profile data from database
  const getProfile = async () => {
    try {
      const response = await API.get("/user");
      // Store product data to useState variabel
      setProfile(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <>
      <Navbar className="nav">
        <Container>
          <Link to="/">
            <Navbar.Brand>
              <Image src={Logo} />
            </Navbar.Brand>
          </Link>
          <Navbar.Toggle />
          <Navbar.Collapse className="default justify-content-end">
            {state.user.role === "user" ? (
              <Navbar.Collapse className="default justify-content-end">
                <Link to="/order">
                  <div className="card-cart">
                    <div className="card-img">
                      <Image src={basket}></Image>
                    </div>

                    <div className="wrap-cart">
                      <Badge className="cart bg-danger">
                        {orderMenus.subtotal}
                      </Badge>
                    </div>
                  </div>
                </Link>

                <NavDropdown
                  className="dropdown"
                  title={
                    <Image
                      className="poto"
                      src={
                        profile.image === "http://localhost:5000/uploads/null"
                          ? potoUser
                          : profile.image
                      }
                    ></Image>
                  }
                  id="nav-dropdown"
                >
                  <NavDropdown.Item className="textDropdown" eventKey="4.1">
                    <Link to="/profile">
                      <Image className="img" src={user}></Image>
                      Profile
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    className="textDropdown"
                    eventKey="4.4"
                    onClick={logout}
                  >
                    <Image className="img" src={out}></Image>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </Navbar.Collapse>
            ) : (
              <Navbar.Text>
                <button className="buttonUser" onClick={registerShow}>
                  Register
                </button>
                <button className="buttonUser" onClick={loginShow}>
                  Login
                </button>
              </Navbar.Text>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Register showRegister={showRegister} registerClose={registerClose} />
      <Login showLogin={showLogin} loginClose={loginClose} />
    </>
  );
}
