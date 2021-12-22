import { Container, Row, Col, Form, Image, Button } from "react-bootstrap";
import { useNavigate } from "react-router";

import NavbarPartner from "../components/NavbarPartner";
import cssAp from "./styleModule/AddProduct.module.css";
import file from "../image/Frame 1.png";

import React, { useState, useEffect } from "react";
import { API } from "../config/api";

function AddProduct() {
  let navigate = useNavigate();

  console.clear();

  const [preview, setPreview] = useState(null); //For image preview

  const [form, setForm] = useState({
    image: "",
    title: "",
    price: "",
  }); //Store product data

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

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      // Configuration
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      console.log(form);

      // Store data with FormData as object
      const formData = new FormData();
      formData.set("image", form.image[0], form.image[0].name);
      formData.set("title", form.title);
      formData.set("price", form.price);

      //   console.log(formData);
      //   console.log(formData.set("title", form.title));
      //   console.log(FormData());
      //   console.log(config);

      // Insert product data
      const response = await API.post("/product", formData, config);
      console.log(response);

      navigate("/my-product");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <NavbarPartner />
      <div className={cssAp.main}>
        <Container>
          <div className={cssAp.row}>
            <h1 className={cssAp.title}>Add Product</h1>
            <form onSubmit={handleSubmit}>
              <Row>
                <Col className="float-end mb-3">
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
                        aria-label="File browser example"
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

export default AddProduct;
