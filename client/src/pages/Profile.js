import { Container, Row, Col, Card, Image, Alert } from "react-bootstrap";
import React, { useContext, useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import { UserContext } from "../context/userContext";
import { API } from "../config/api";

import dateFormat from "dateformat";
import convertRupiah from "rupiah-format";
import cssProfile from "./styleModule/Profile.module.css";
import NavbarUser from "../components/NavbarUser";

import logo from "../image/Icon.svg";
import noPhoto from "../image/No-photo-m.png";
import imgEmpty from "../image/undraw_clean_up_ucm0.svg";

function Profile() {
  let navigate = useNavigate();
  // let { id } = useParams();

  function handleClick() {
    navigate("/profile-edit");
  }

  const [state] = useContext(UserContext);

  const [profile, setProfile] = useState({});

  // Fetching profile data from database
  const getProfile = async () => {
    console.log("test profile");
    try {
      const response = await API.get("/user");
      // Store product data to useState variabel
      setProfile(response.data.data);

      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   getProfile();
  // }, []);

  const [transactions, setTransactions] = useState([]);

  // Fetching profile data from database
  const getTransactions = async () => {
    console.log("test transaction");
    try {
      const response = await API.get("/my-transactions");
      // Store product data to useState variabel
      setTransactions(response.data.data);

      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(transactions);

  useEffect(() => {
    getProfile();
    getTransactions();
  }, []);

  const [message, setMessage] = useState(null);

  const onSuccess = async (e, id) => {
    try {
      e.preventDefault();

      const data = {
        status: "success",
      };

      console.log(data);

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      // Update transaction data
      const response = await API.patch(`/transaction/${id}`, data, config);

      console.log(response);
      const alert = (
        <Alert variant="success" className="py-1">
          Transaction Finished
        </Alert>
      );
      setMessage(alert);
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Transaction Failed
        </Alert>
      );
      setMessage(alert);
      console.log(error);
    }
  };
  return (
    <>
      <NavbarUser />
      <div className={cssProfile.main}>
        <Container>
          <Row className={cssProfile.row}>
            <Col>
              <h1 className={cssProfile.title}>My Profile</h1>
              <div className="d-flex mb-3">
                <div>
                  <Image
                    className={cssProfile.photo}
                    src={
                      profile.image === "http://localhost:5000/uploads/null"
                        ? noPhoto
                        : profile.image
                    }
                  ></Image>
                </div>
                <div className="mt-2">
                  <h5 className={cssProfile.label}>Full Name</h5>
                  <p className={cssProfile.isi}>{state.user.fullName}</p>

                  <h5 className={cssProfile.label}>Email</h5>
                  <p className={cssProfile.isi}>{state.user.email}</p>

                  <h5 className={cssProfile.label}>Phone</h5>
                  <p className={cssProfile.isi}>{profile.phone}</p>
                </div>
              </div>
              <button className={cssProfile.btnProfile} onClick={handleClick}>
                Edit Profile
              </button>
            </Col>
            {transactions.length !== 0 ? (
              <Col className={cssProfile.left}>
                <h1 className={cssProfile.title}>History Transaction</h1>
                {message && message}
                {transactions?.map((item, index) => (
                  <Card
                    className={`${cssProfile.cardTransaction} mb-3`}
                    key={index}
                  >
                    <Card.Body className="d-flex">
                      <div className={cssProfile.trsLeft}>
                        <h3 className={cssProfile.namePartner}>
                          {item.user.fullName}
                        </h3>
                        <p className={cssProfile.tgl}>
                          {dateFormat(item.createdAt, "dddd, d mmmm yyyy")}
                        </p>
                        <p className={cssProfile.total}>
                          Total :
                          {convertRupiah.convert(
                            item.order
                              .map((elm) => {
                                return elm.qty * elm.product.price;
                              })
                              .reduce((a, b) => {
                                return a + b;
                              })
                          )}
                        </p>
                      </div>
                      <div className={cssProfile.trsRight}>
                        <div>
                          <Image className={cssProfile.logo} src={logo}></Image>
                        </div>
                        <div>
                          {item.status === "success" ? (
                            <button className={cssProfile.btnTrs}>
                              Finished
                            </button>
                          ) : item.status === "waiting approve" ? (
                            <button className={cssProfile.btnTrsApprove}>
                              {item.status}
                            </button>
                          ) : item.status === "on the way" ? (
                            <button
                              className={cssProfile.btnTrsOtw}
                              onClick={(e) => onSuccess(e, item.id)}
                            >
                              {item.status}
                            </button>
                          ) : (
                            <button className={cssProfile.btnTrsCancel}>
                              {item.status}
                            </button>
                          )}
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                ))}
              </Col>
            ) : (
              <Col className={cssProfile.left}>
                <h1 className={cssProfile.title}>History Transaction</h1>

                <div className="text-center pt-5">
                  <img
                    src={imgEmpty}
                    className="img-fluid"
                    style={{ width: "100%" }}
                    alt="empty"
                  />
                  <div className="mt-3">No data product</div>
                </div>
              </Col>
            )}
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Profile;
