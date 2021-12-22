import {
  Container,
  Form,
  Row,
  Col,
  Image,
  Modal,
  Alert,
} from "react-bootstrap";
import { useNavigate } from "react-router";
import { useState, useContext } from "react";
import cssOrder from "./styleModule/Order.module.css";
import NavbarUser from "../components/NavbarUser";
import convertRupiah from "rupiah-format";

import { OrderContext } from "../context/orderContext";
import { API } from "../config/api";

// import Mapp from '../pages/Map';
import imgEmpty from "../image/undraw_clean_up_ucm0.svg";
import MapCoba from "../pages/Map1";
import MapGoogle from "../components/Map";

import map from "../image/map 1.png";
import trash from "../image/Group.png";

function Order() {
  const [showMap, setMap] = useState(false);
  const mapClose = () => setMap(false);
  const mapShow = () => setMap(true);

  const [message, setMessage] = useState(null);

  let navigate = useNavigate();
  function handleClick() {
    navigate("/map");
  }

  const { orderMenus, setOrderMenus } = useContext(OrderContext);

  const order = orderMenus.carts;

  console.log(order);

  const multiple = order.map((elm) => {
    return elm.item.price * elm.qty;
  });

  const sum =
    multiple.length === 0
      ? 0
      : multiple.reduce((a, b) => {
          return a + b;
        });

  const ongkir = 10000;

  const total = sum + ongkir;

  const onClickIncrement = (e, item) => {
    e.preventDefault();

    console.log("test");
    let currentCarts = orderMenus.carts;
    let currentSubTotal = orderMenus.subtotal;
    currentCarts.map((element) => {
      if (element.item.id === item.id) {
        element.qty += 1;
        currentSubTotal += 1;
      }
      return element;
    });
    setOrderMenus({ carts: currentCarts, subtotal: currentSubTotal });
  };

  const onClickDecrement = (e, item) => {
    e.preventDefault();

    let currentCarts = orderMenus.carts;
    let currentSubTotal = orderMenus.subtotal;
    currentCarts.map((element) => {
      if (element.item.id === item.id) {
        element.qty -= 1;
        currentSubTotal -= 1;
      }
      return element;
    });
    setOrderMenus({ carts: currentCarts, subtotal: currentSubTotal });
  };

  const onClickTrash = (e, item) => {
    e.preventDefault();

    let currentCarts = orderMenus.carts;
    let currentSubTotal = orderMenus.subtotal;
    currentCarts = currentCarts.filter((element) => {
      if (element.item.id === item.id) {
        currentSubTotal -= element.qty;
      }
      return element.item.id !== item.id;
    });

    setOrderMenus({ carts: currentCarts, subtotal: currentSubTotal });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      // get id and qty
      let currentCarts = orderMenus.carts;
      let dataTransaction = currentCarts.map((element) => {
        return {
          id: element.item.id,
          qty: element.qty,
        };
      });

      let product = {
        products: dataTransaction,
      };

      console.log(product);

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      // Insert transaction data
      const response = await API.post("/transaction", product, config);

      const alert = (
        <Alert variant="success" className="py-1">
          Transaction success
        </Alert>
      );
      setMessage(alert);

      console.log(response);
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
      <div className={cssOrder.main}>
        <Container>
          {message && message}
          {order.length !== 0 ? (
            <div className={cssOrder.wrap}>
              <h1 className={cssOrder.mainTitle}>Geprek Bensu</h1>
              <p className={cssOrder.text}>Delivery Location</p>
              <Row className="align-items-center">
                <Col>
                  <Form.Control
                    className={`${cssOrder.put} mb-2`}
                    id="inlineFormInput"
                    placeholder="Jane Doe"
                  />
                </Col>
                <Col xs="auto">
                  <div>
                    <button
                      className={cssOrder.btn}
                      type="reset"
                      // onClick={handleClick}

                      onClick={mapShow}
                    >
                      Select On Map
                      <Image
                        alt="none image"
                        className={cssOrder.map}
                        src={map}
                      ></Image>
                    </button>
                  </div>
                </Col>
              </Row>
              <form onSubmit={handleSubmit}>
                <Row>
                  <p className={cssOrder.titleTable}>Review Your Order</p>
                  <Col xs={7}>
                    <div className={cssOrder.border}></div>
                    {order?.map((element, index) => (
                      <div className={cssOrder.card} key={index}>
                        <div className={cssOrder.cardOrder}>
                          <div>
                            <Image
                              className={cssOrder.img}
                              src={element.item.image}
                            ></Image>
                          </div>

                          <div className={cssOrder.pesan}>
                            <p className={cssOrder.cookName}>
                              {element.item.title}
                            </p>

                            <button
                              className={cssOrder.btnPlusMin}
                              onClick={(e) => onClickDecrement(e, element.item)}
                            >
                              -
                            </button>

                            <input
                              className={cssOrder.qty}
                              type="text"
                              value={element.qty}
                              name="qty"
                            />

                            <button
                              className={cssOrder.btnPlusMin}
                              onClick={(e) => onClickIncrement(e, element.item)}
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <div className={cssOrder.cardPrice}>
                          <p className={cssOrder.price}>
                            {convertRupiah.convert(element.item.price)}
                          </p>
                          <button
                            className={cssOrder.btnTrash}
                            onClick={(e) => onClickTrash(e, element.item)}
                          >
                            <Image src={trash}></Image>
                          </button>
                        </div>
                      </div>
                    ))}
                  </Col>
                  <Col>
                    <div className={cssOrder.border}></div>
                    <div className={`${cssOrder.card} pt-2`}>
                      <div className={cssOrder.subtotal}>
                        <p>Subtotal</p>
                        <p>Qty</p>
                        <p>Ongkir</p>
                      </div>
                      <div className={cssOrder.priceSubtotal}>
                        <p className={cssOrder.price}>
                          {convertRupiah.convert(sum)}
                        </p>
                        <p className={cssOrder.subtotal}>
                          {orderMenus.subtotal}
                        </p>
                        <p className={cssOrder.price}>
                          {convertRupiah.convert(ongkir)}
                        </p>
                      </div>
                    </div>
                    <div className={cssOrder.cardTotal}>
                      <div>
                        <p className={cssOrder.total}>Total</p>
                      </div>
                      <div>
                        <p className={`${cssOrder.total} text-end`}>
                          {convertRupiah.convert(total)}
                        </p>
                      </div>
                    </div>
                  </Col>
                </Row>

                <div className={cssOrder.btnWrap}>
                  <button className={cssOrder.btnOrder} type="submit">
                    Order
                  </button>
                </div>
              </form>
            </div>
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
        </Container>

        <Modal
          show={showMap}
          onHide={mapClose}
          centered
          fullscreen="xxl-down"
          className={cssOrder.modal}
        >
          <Modal.Body className={cssOrder.modalContent}>
            <div>
              {/* <MapGoogle /> */}
              <MapCoba />
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}

export default Order;
