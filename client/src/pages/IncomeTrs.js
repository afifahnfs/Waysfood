import { useState, useEffect, useContext } from "react";
import { Container, Col, Alert } from "react-bootstrap";
import { API } from "../config/api";

import cssIncomeTrs from "./styleModule/IncomeTrs.module.css";
import NavbarPartner from "../components/NavbarPartner";

import cancel from "../image/cancel 1.png";
import success from "../image/Group (1).png";
import imgEmpty from "../image/undraw_clean_up_ucm0.svg";

function IncomeTransaction() {
  const [message, setMessage] = useState(null);

  const [transactionPartner, setTransactionPartner] = useState([]);

  const getTransaction = async () => {
    try {
      const response = await API.get("/partner-transactions");
      // Store product data to useState variabel
      setTransactionPartner(response.data.data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(transactionPartner);

  useEffect(() => {
    getTransaction();
  }, []);

  const onSuccess = async (e, id) => {
    try {
      e.preventDefault();

      const data = {
        status: "on the way",
      };

      console.log(data);

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      // Update transaction data
      const response = await API.patch(`/transaction/${id}`, data, config);

      console.log(response);

      const alert = (
        <Alert variant="success" className="py-1">
          Approve Transaction Success
        </Alert>
      );
      setMessage(alert);
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Approve Transaction Failed
        </Alert>
      );
      setMessage(alert);
      console.log(error);
    }
  };

  const onCancel = async (e, id) => {
    try {
      e.preventDefault();

      const data = {
        status: "cancel",
      };

      console.log(id);

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      // Update transaction data
      const response = await API.patch(`/transaction/${id}`, data, config);

      console.log(response);

      const alert = (
        <Alert variant="success" className="py-1">
          Cancel Transaction Success
        </Alert>
      );
      setMessage(alert);
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Cancel Transaction Failed
        </Alert>
      );
      setMessage(alert);

      console.log(error);
    }
  };

  return (
    <>
      <NavbarPartner />
      <div className={cssIncomeTrs.main}>
        <Container>
          {message && message}
          <div className={cssIncomeTrs.row}>
            <h1 className={cssIncomeTrs.title}>Income Tansaction</h1>
            {transactionPartner.length !== 0 ? (
              <table>
                <tr className={cssIncomeTrs.tableTop}>
                  <th>No</th>
                  <th>Name</th>
                  <th>Address</th>
                  <th>Products Order</th>
                  <th>Status</th>
                  <th className="text-center">Action</th>
                </tr>
                {transactionPartner?.map((item, index) => (
                  <tr className={cssIncomeTrs.tableBody}>
                    <td>{index + 1}</td>
                    <td>{item.user.fullName}</td>
                    <td>{item.user.location}</td>
                    <td>
                      {item.order.map((elm) => {
                        return elm.product.title;
                      })}
                    </td>
                    {item.status === "waiting approve" ? (
                      <td className={cssIncomeTrs.approve}>{item.status}</td>
                    ) : item.status === "success" ? (
                      <td className={cssIncomeTrs.success}>{item.status}</td>
                    ) : item.status === "on the way" ? (
                      <td className={cssIncomeTrs.otw}>{item.status}</td>
                    ) : (
                      <td className={cssIncomeTrs.cancel}>{item.status}</td>
                    )}

                    <td>
                      {item.status === "waiting approve" ? (
                        <div className="d-flex justify-content-around">
                          <button
                            className={cssIncomeTrs.btnCancel}
                            variant="primary"
                            size="sm"
                            onClick={(e) => onCancel(e, item.id)}
                          >
                            Cancel
                          </button>

                          <button
                            className={cssIncomeTrs.btnApprove}
                            variant="secondary"
                            size="sm"
                            onClick={(e) => onSuccess(e, item.id)}
                          >
                            Approve
                          </button>
                        </div>
                      ) : item.status === "success" ? (
                        <div className="d-flex justify-content-center">
                          <img src={success} alt="" />
                        </div>
                      ) : item.status === "on the way" ? (
                        <div className="d-flex justify-content-center">
                          <img src={success} alt="" />
                        </div>
                      ) : (
                        <div className="d-flex justify-content-center">
                          <img src={cancel} alt="" />
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </table>
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

export default IncomeTransaction;
