import { Container, Row, Col, Form, Image, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import cssAp from "./styleModule/AddProduct.module.css";
import file from "../image/Frame 1.png";
import NavbarPartner from "../components/NavbarPartner";

import React, { useState, useEffect } from "react";
import { API } from "../config/api";

function EditProduct() {
  console.clear();

  let navigate = useNavigate();

  const { id } = useParams();

  const [preview, setPreview] = useState(null); //For image preview
  const [product, setProduct] = useState({}); //Store product data

  // Create Variabel for store product data here ...
  const [form, setForm] = useState({
    image: "",
    title: "",
    price: "",
  }); //Store product data

  console.log(form);
  // Create function get product data by id from database here ...
  const getProduct = async (id) => {
    try {
      const response = await API.get("/product/" + id);
      // Store product data to useState variabel
      setPreview(response.data.data.image);
      setForm({
        ...form,
        title: response.data.data.title,
        price: response.data.data.price,
      });
      setProduct(response.data.data);

      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Call function get product with useEffect didMount here ...
  useEffect(() => {
    getProduct(id);
  }, []);

  // Create function for handle change data on form here ...
  // Handle change data on form
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });

    // Create image url for preview
    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };

  // Create function for handle submit data ...
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      // Configuration
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      // Store data with FormData as object
      const formData = new FormData();
      if (form.image) {
        formData.set("image", form?.image[0], form?.image[0]?.name);
      }
      formData.set("title", form.title);
      formData.set("price", form.price);

      // Insert product data
      const response = await API.patch(
        `/product/${product.id}`,
        formData,
        config
      );
      console.log(response.data);

      navigate("/my-product");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {}, [product]);

  return (
    <>
      <NavbarPartner />
      <div className={cssAp.main}>
        <Container>
          <div className={cssAp.row}>
            <h1 className={cssAp.title}>Edit Product</h1>
            <form onSubmit={handleSubmit}>
              <Row>
                <Col xs={3} className="float-xl-end mb-3">
                  {preview && (
                    <div>
                      <img
                        src={preview}
                        style={{
                          maxWidth: "150px",
                          maxHeight: "150px",
                          objectFit: "cover",
                        }}
                        alt="preview"
                      />
                    </div>
                  )}
                </Col>
              </Row>
              <Row className={cssAp.wrap}>
                <Col xs={9}>
                  <Form.Control
                    className={cssAp.inputForm}
                    placeholder="Title"
                    name="title"
                    onChange={handleChange}
                    value={form.title}
                  />
                </Col>
                <Col>
                  <Form.Group controlId="formFile">
                    <Form.Label className={cssAp.btnFile}>
                      Attach Image
                      <Form.Control
                        type="file"
                        hidden
                        name="image"
                        onChange={handleChange}
                      />
                      <Image className={cssAp.file} src={file}></Image>
                    </Form.Label>
                  </Form.Group>
                </Col>
              </Row>
              <Row className={cssAp.wrap}>
                <Col xs={12}>
                  <Form.Control
                    className={cssAp.inputForm}
                    placeholder="Price"
                    name="price"
                    onChange={handleChange}
                    value={form.price}
                  />
                </Col>
              </Row>

              <Col xs={3} className="float-xl-end mt-3">
                <Button className={`${cssAp.btn} mb-2`} type="submit">
                  Save
                </Button>
              </Col>
            </form>
          </div>
        </Container>
      </div>
    </>
  );
}

export default EditProduct;
