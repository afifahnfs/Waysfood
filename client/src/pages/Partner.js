import { Container, Row, Col, Card, Image } from "react-bootstrap";
import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../context/userContext";
import { useQuery } from "react-query";
import { API } from "../config/api";

import dateFormat from "dateformat";
import convertRupiah from "rupiah-format";
import cssProfile from "./styleModule/Profile.module.css";
import NavbarPartner from "../components/NavbarPartner";
import logo from "../image/Icon.svg";
// import partner from "../image/partner.png";
import noPhoto from "../image/No-photo-m.png";
import imgEmpty from "../image/undraw_clean_up_ucm0.svg";

function Partner() {
  let navigate = useNavigate();
  function handleClick() {
    navigate("/partner-edit");
  }

  const [state] = useContext(UserContext);

  const [profile, setProfile] = useState({});

  // Fetching profile data from database
  const getProfile = async () => {
    try {
      const response = await API.get("/user");
      // Store product data to useState variabel
      setProfile(response.data.data);

      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(profile);

  useEffect(() => {
    getProfile();
  }, []);

  const [transactions, setTransactions] = useState([]);

  const getTransactions = async () => {
    try {
      const response = await API.get("/partner-transactions");

      setTransactions(response.data.data);

      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(transactions);

  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <>
      <NavbarPartner />
      <div className={cssProfile.main}>
        <Container>
          <Row className={cssProfile.row}>
            <Col>
              <h1 className={cssProfile.title}>Profile Partner</h1>
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
                  <p className={cssProfile.isi}>{profile.fullName}</p>

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
                            <button className={cssProfile.btnTrsOtw}>
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

export default Partner;
