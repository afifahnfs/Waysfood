import { Container, Row, Col, Form, Image, Modal } from "react-bootstrap";
import { useNavigate } from "react-router";
import React, { useState, useEffect } from "react";
import { API } from "../config/api";

import NavbarPartner from "../components/NavbarPartner";
import cssPd from "./styleModule/ProfileEdit.module.css";
import MapCoba from "../pages/Map1";
import map from "../image/map 1.png";
import file from "../image/Frame 1.png";

function PartnerEdit() {
  const [showMap, setMap] = useState(false);
  const mapClose = () => setMap(false);
  const mapShow = () => setMap(true);

  let navigate = useNavigate();

  const [preview, setPreview] = useState(null); //For image preview
  const [profile, setProfile] = useState({}); //Profile data

  // Create Variabel for profile product data here ...
  const [form, setForm] = useState({
    image: "",
    fullName: "",
    email: "",
    phone: "",
    location: "",
  }); //profile data

  // Create function get product data by id from database here ...
  const getProfile = async () => {
    try {
      const response = await API.get("/user");
      // Store product data to useState variabel
      setPreview(response.data.data.image);
      setForm({
        ...form,
        fullName: response.data.data.fullName,
        email: response.data.data.email,
        phone: response.data.data.phone,
        location: response.data.data.location,
      });
      setProfile(response.data.data);

      // console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfile();
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
      formData.set("fullName", form.fullName);
      formData.set("email", form.email);
      formData.set("phone", form.phone);
      formData.set("location", form.location);

      // Insert product data
      const response = await API.patch(`/user`, formData, config);

      console.log(response.data);
      navigate("/partner");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {}, [profile]);

  return (
    <>
      <NavbarPartner />
      <div className={cssPd.main}>
        <Container>
          <div className={cssPd.row}>
            <h1 className={cssPd.title}>Edit Profile Partner</h1>
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
              <Row className={cssPd.wrap}>
                <Col xs={9}>
                  <input
                    className={cssPd.inputForm}
                    placeholder="Full Name"
                    name="fullName"
                    onChange={handleChange}
                    value={form.fullName}
                  />
                </Col>
                <Col>
                  <Form.Group controlId="formFile">
                    <label className={cssPd.btnFile}>
                      Attach Image
                      <input
                        type="file"
                        name="image"
                        hidden
                        onChange={handleChange}
                      />
                      <Image className={cssPd.file} src={file}></Image>
                    </label>
                  </Form.Group>
                </Col>
              </Row>
              <Row className={cssPd.wrap}>
                <Col xs={12}>
                  <input
                    className={cssPd.inputForm}
                    placeholder="Email"
                    name="email"
                    onChange={handleChange}
                    value={form.email}
                  />
                </Col>
              </Row>
              <Row className={cssPd.wrap}>
                <Col xs={12}>
                  <input
                    className={cssPd.inputForm}
                    placeholder="Phone"
                    name="phone"
                    onChange={handleChange}
                    value={form.phone}
                  />
                </Col>
              </Row>
              <Row className={cssPd.wrap}>
                <Col xs={9}>
                  <input
                    className={cssPd.inputForm}
                    placeholder="Location"
                    name="location"
                    onChange={handleChange}
                    value={form.location}
                  />
                </Col>
                <Col>
                  <button
                    className={`${cssPd.btnMap} mb-2`}
                    type="reset"
                    onClick={mapShow}
                  >
                    Select On Map
                    <Image
                      alt="none image"
                      className={cssPd.map}
                      src={map}
                    ></Image>
                  </button>
                </Col>
              </Row>
              <Col xs={3} className="float-xl-end mt-3">
                <button
                  type="submit"
                  variant="success"
                  className={cssPd.btnSave}
                >
                  Save
                </button>
              </Col>
            </form>
          </div>
        </Container>
      </div>

      <Modal show={showMap} onHide={mapClose} centered fullscreen="xxl-down">
        <Modal.Body className={cssPd.modalContent}>
          <div>
            <MapCoba />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default PartnerEdit;
