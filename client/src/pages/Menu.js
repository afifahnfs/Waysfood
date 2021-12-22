import { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useParams } from "react-router";
import { API } from "../config/api";
import convertRupiah from "rupiah-format";
import NavbarUser from "../components/NavbarUser";
// import ProductCard from "../components/ProductCard";
import { OrderContext } from "../context/orderContext";

import cssMenu from "./styleModule/Menu.module.css";
import imgEmpty from "../image/undraw_clean_up_ucm0.svg";

function Menu() {
  let { id } = useParams();

  const [title, setTitle] = useState([]);

  const getTitle = async (id) => {
    try {
      const response = await API.get("/user/" + id);
      setTitle(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTitle(id);
  }, []);

  const [products, setProducts] = useState([]);

  const getProducts = async (id) => {
    try {
      const response = await API.get("/product-partner/" + id);
      // Store product data to useState variabel
      setProducts(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts(id);
  }, []);

  const { orderMenus, setOrderMenus } = useContext(OrderContext);

  let cart = false;

  let clickOrder = (item) => {
    console.log(item);
    console.log(orderMenus);

    const currentCarts = orderMenus.carts;
    console.log(currentCarts);

    let currentSubTotal = orderMenus.subtotal;

    const isAlreadyExist = currentCarts.some(
      (element) => element.item.id === item.id
    );
    if (!isAlreadyExist) {
      currentCarts.push({ item: item, qty: 1 });
      setOrderMenus({
        carts: currentCarts,
        subtotal: currentSubTotal + 1,
      });

      console.log(orderMenus);
      return;
    }
    currentCarts.map((element) => {
      if (element.item.id === item.id) {
        element.qty += 1;
        currentSubTotal += 1;
      }
      return element;
    });

    setOrderMenus({ carts: currentCarts, subtotal: currentSubTotal });

    console.log(orderMenus);
  };

  return (
    <>
      <NavbarUser />
      <div className={cssMenu.main}>
        <Container>
          <div className={cssMenu.wrap}>
            <div className={cssMenu.mainTitle}>
              <h1>{title.fullName}, Menus</h1>
            </div>
            {products.length !== 0 ? (
              <Row xs={1} md={4} className={`${cssMenu.mainCard} g-4`}>
                {products?.map((item, index) => (
                  <Col className={cssMenu.col} key={index}>
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
                          onClick={() => clickOrder(item)}
                        >
                          Order
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

export default Menu;
