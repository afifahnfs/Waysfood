import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, Col } from "react-bootstrap";

import cssMenu from "../pages/styleModule/Menu.module.css";

import convertRupiah from "rupiah-format";

export default function ProductCard({ item, clickOrder }) {
    return (
        <Col className={cssMenu.col}>
            <Card>
                <Card.Img
                    className={cssMenu.img}
                    variant="top"
                    src={item.image}
                />
                <Card.Body>
                    <Card.Title className={cssMenu.title}>
                        {item.title}
                    </Card.Title>
                    <Card.Text className={cssMenu.text}>
                        {convertRupiah.convert(item.price)}
                    </Card.Text>
                    <button
                        className={cssMenu.btn}
                        // onClick={clickOrder(item.id)}
                        onClick={() => clickOrder(item)}
                    >
                        Order
                    </button>
                </Card.Body>
            </Card>
        </Col>
    );
}
