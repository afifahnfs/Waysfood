import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import { Container, Row, Col, Card, Alert } from "react-bootstrap";
import { UserContext } from "../context/userContext";
import { API } from "../config/api";

// import ProductByPartner from "../components/ProductByPartner";
import convertRupiah from "rupiah-format";

import NavbarPartner from "../components/NavbarPartner";
import cssMenu from "./styleModule/Menu.module.css";
import imgEmpty from "../image/undraw_clean_up_ucm0.svg";

function MyProducts() {
    let navigate = useNavigate();

    const [state] = useContext(UserContext);

    const title = state.user.fullName;

    // SHOW PRODUCTS

    const [products, setProducts] = useState([]);

    const getProducts = async () => {
        try {
            const response = await API.get("/my-product");
            // Store product data to useState variabel
            setProducts(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    // MOVE TO PAGE EDIT PRODUCT

    const handleUpdate = (id) => {
        navigate("/edit-product/" + id);
    };

    // DELETE PRODUCT

    const [message, setMessage] = useState(null);

    const handleDelete = async (id) => {
        try {
            await API.delete(`/product/${id}`);
            getProducts();

            const alert = (
                <Alert variant="success" className="py-1">
                    Delete success
                </Alert>
            );
            setMessage(alert);
        } catch (error) {
            const alert = (
                <Alert variant="danger" className="py-1">
                    Delete Failed
                </Alert>
            );
            setMessage(alert);
            console.log(error);
        }
    };

    return (
        <>
            <NavbarPartner />
            <div className={cssMenu.main}>
                <Container>
                    <div className={cssMenu.wrap}>
                        <div className={cssMenu.mainTitle}>
                            <h1>{title}, Menus</h1>
                        </div>
                        {message && message}
                        {products.length !== 0 ? (
                            <Row
                                xs={1}
                                md={4}
                                className={`${cssMenu.mainCard} g-4`}
                            >
                                {products?.map((item, index) => (
                                    <Col className={cssMenu.col} key={index}>
                                        <Card className={cssMenu.cardBody}>
                                            <Card.Img
                                                className={cssMenu.img}
                                                variant="top"
                                                src={item.image}
                                            />
                                            <Card.Body>
                                                <Card.Title
                                                    className={cssMenu.title}
                                                >
                                                    {item.title}
                                                </Card.Title>
                                                <Card.Text
                                                    className={cssMenu.text}
                                                >
                                                    {convertRupiah.convert(
                                                        item.price
                                                    )}
                                                </Card.Text>
                                                <button
                                                    className={`${cssMenu.btnEdit} mb-2`}
                                                    onClick={() => {
                                                        handleUpdate(item.id);
                                                    }}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className={
                                                        cssMenu.btnDelete
                                                    }
                                                    onClick={() => {
                                                        handleDelete(item.id);
                                                    }}
                                                >
                                                    Delete
                                                </button>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        ) : (
                            <Col>
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
                    </div>
                </Container>
            </div>
        </>
    );
}

export default MyProducts;
