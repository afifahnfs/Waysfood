import { Container, Image, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import { API } from "../config/api";

import cssHome from "./styleModule/Home.module.css";
import RestauransCard from "../components/RestauransCard";

import imgEmpty from "../image/undraw_clean_up_ucm0.svg";
import pizza from "../image/pizza.png";
import burgerKing from "../image/burger.png";
import starbucks from "../image/starbucks.png";
import kfc from "../image/kfc.png";
import jco from "../image/jco.png";

import NavbarUser from "../components/NavbarUser";

function Home() {
    // let navigate = useNavigate();
    // function clickMenu() {
    //     navigate("/menu");
    // }

    const [restaurans, setRestaurant] = useState([]);

    const getRestaurant = async () => {
        try {
            const response = await API.get("/partners");
            // Store product data to useState variabel
            setRestaurant(response.data.data);

            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getRestaurant();
    }, []);

    return (
        <div>
            <NavbarUser />
            <div className={cssHome.top}>
                <div className={cssHome.topMain}>
                    <div className={cssHome.topMainLeft}>
                        <h1 className={cssHome.topH1}>Are You Hungry ?</h1>
                        <h1 className={cssHome.topH1}>Express Home Delivery</h1>
                        <div className={cssHome.topSpace}>
                            <div className={cssHome.rectangle}></div>
                            <p className={cssHome.topText}>
                                Lorem Ipsum is simply dummy text of the printing
                                and typesetting industry. Lorem Ipsum has been
                                the industry's standard dummy text ever since
                                the 1500s.
                            </p>
                        </div>
                    </div>
                    <div className={cssHome.topMainRight}>
                        <Image src={pizza} className={cssHome.imgPizza}></Image>
                    </div>
                </div>
            </div>
            <div className={cssHome.main}>
                <Container>
                    <div className={cssHome.content}>
                        <div>
                            <h1 className={cssHome.mainTitle}>
                                Popular Restaurant
                            </h1>
                        </div>

                        <Row
                            xs={1}
                            md={4}
                            className={`${cssHome.mainCard} g-4`}
                        >
                            <Col>
                                <div className={cssHome.cardBody}>
                                    <Image
                                        className={cssHome.cardImg}
                                        src={burgerKing}
                                    />
                                    <h1 className={cssHome.cardTitle}>
                                        Burger King
                                    </h1>
                                </div>
                            </Col>
                            <Col>
                                <div className={cssHome.cardBody}>
                                    <Image
                                        className={cssHome.cardImg}
                                        variant="top"
                                        src={starbucks}
                                    />
                                    <h1 className={cssHome.cardTitle}>
                                        Starbucks
                                    </h1>
                                </div>
                            </Col>
                            <Col>
                                <div className={cssHome.cardBody}>
                                    <Image
                                        className={cssHome.cardImg}
                                        variant="top"
                                        src={kfc}
                                    />
                                    <h1 className={cssHome.cardTitle}>KFC</h1>
                                </div>
                            </Col>
                            <Col>
                                <div className={cssHome.cardBody}>
                                    <Image
                                        className={cssHome.cardImg}
                                        variant="top"
                                        src={jco}
                                    />
                                    <h1 className={cssHome.cardTitle}>JCO</h1>
                                </div>
                            </Col>
                        </Row>

                        <div>
                            <h1 className={cssHome.mainTitle}>
                                Restaurant Near You
                            </h1>
                        </div>

                        {restaurans.length !== 0 ? (
                            <Row
                                xs={1}
                                md={4}
                                className={`${cssHome.mainCard} g-4`}
                            >
                                {restaurans?.map((item, index) => (
                                    <RestauransCard item={item} key={index} />
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
                                    <div className="mt-3">
                                        No data restaurant
                                    </div>
                                </div>
                            </Col>
                        )}
                    </div>
                </Container>
            </div>
        </div>
    );
}

export default Home;
