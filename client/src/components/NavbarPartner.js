import { Navbar, Container, Image, NavDropdown } from "react-bootstrap";
import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { API } from "../config/api";

import "bootstrap/dist/css/bootstrap.min.css";
import "../style/style.css";

import user from "../image/user 2.png";
import out from "../image/logout 1.png";
import food from "../image/Vector (1).png";
import Logo from "../image/Icon.png";
import partner from "../image/Ellipse 1 (1).png";
export default function NavbarPartner() {
  const [state, dispatch] = useContext(UserContext);

  let navigate = useNavigate();

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
    <Navbar className="nav">
      <Container>
        <Link to="/">
          <Navbar.Brand>
            <Image src={Logo} />
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle />
        <Navbar.Collapse className="default justify-content-end">
          <Navbar.Text></Navbar.Text>

          <Navbar.Collapse className="default justify-content-end">
            <NavDropdown
              className="dropdown"
              title={
                <Image
                  className="poto"
                  src={profile.image ? profile?.image : partner}
                ></Image>
              }
              id="nav-dropdown"
            >
              <NavDropdown.Item className="textDropdown" eventKey="4.1">
                <Link to="/partner">
                  <Image className="img" src={user}></Image>
                  Profile Partner
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item className="textDropdown" eventKey="4.2">
                <Link to="/add-product">
                  <Image className="img" src={food}></Image>
                  Add Product
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item className="textDropdown" eventKey="4.2">
                <Link to="/my-product">
                  <Image className="img" src={food}></Image>
                  MyProduct
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
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
