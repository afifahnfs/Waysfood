import React from "react";
// import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { Card, Col } from "react-bootstrap";

import cssHome from "../pages/styleModule/Home.module.css";

export default function RestauransCard({ item }) {
    // console.log(item);

    // let navigate = useNavigate();
    // function clickMenu() {
    //     navigate("/menu");
    // }

    return (
        <Link to={`/menu/` + item.id} style={{ textDecoration: "none" }}>
            <Col>
                <Card>
                    <Card.Img
                        variant="top"
                        className={cssHome.photo}
                        src={item.image}
                    />
                    <Card.Body>
                        <Card.Title
                            className={cssHome.nameFood}
                            // onClick={clickMenu}
                        >
                            {item.fullName}
                        </Card.Title>
                        <Card.Text>0,2 KM</Card.Text>
                    </Card.Body>
                </Card>
            </Col>
            ;
        </Link>
    );
}
