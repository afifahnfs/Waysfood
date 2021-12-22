import * as React from "react";
import { Room } from "@material-ui/icons";
import { Button } from "react-bootstrap";

const eventNames = ["onDragStart", "onDrag", "onDragEnd"];

function round5(value) {
  return (Math.round(value * 1e5) / 1e5).toFixed(5);
}

function ControlPanel(props) {
  let myLocation = true;
  let deliveryLoc = false;

  const confriMyLoc = () => {
    console.log("test");
    return (myLocation = false), (deliveryLoc = true);
  };

  console.log(myLocation);
  console.log(deliveryLoc);

  return (
    <div className="control-panel">
      {myLocation ? (
        <div className="card-map">
          <h6 className="title-map">Select My Location</h6>
          <hr />
          <div className="d-flex align-items-center">
            <div>
              <Room style={{ fontSize: "40px", color: "red" }}></Room>
            </div>
            <div>
              <p style={{ fontSize: "14px", fontWeight: "bold" }}>
                National Monumen
              </p>
              <p style={{ fontSize: "14px" }}>
                Gambir, Kecamatan Gambir, Kota Jakarta Pusat, Daerah Khusus
                Ibukota Jakarta
              </p>
            </div>
          </div>
          <div
            style={{
              textAlign: "center",
            }}
          >
            <button className="btn-map" onClick={() => confriMyLoc()}>
              Confrim Location
            </button>
          </div>
        </div>
      ) : (
        deliveryLoc(
          <div
            style={{
              width: "350px",
              backgroundColor: "white",
              margin: "10px",
              padding: "10px",
            }}
          >
            <h6
              style={{
                paddingTop: "3px",
                fontWeight: "bold",
              }}
            >
              Select Delivery Location
            </h6>
            <hr />
            <div className="d-flex align-items-center">
              <div>
                <Room style={{ fontSize: "40px", color: "red" }}></Room>
              </div>
              <div>
                <p style={{ fontSize: "14px", fontWeight: "bold" }}>
                  National Monumen
                </p>
                <p style={{ fontSize: "14px" }}>
                  Gambir, Kecamatan Gambir, Kota Jakarta Pusat, Daerah Khusus
                  Ibukota Jakarta
                </p>
              </div>
            </div>
            <div
              style={{
                textAlign: "center",
              }}
            >
              <Button
                style={{ width: "320px", fontSize: "14px", height: "35px" }}
                // onClick={(e) => confriMyLoc()}
              >
                Confrim Location
              </Button>
            </div>
          </div>
        )
      )}

      {/* <div>
        {eventNames.map((eventName) => {
          const { events = {} } = props;
          const lngLat = events[eventName];
          return (
            <div key={eventName}>
              <strong>{eventName}:</strong>{" "}
              {lngLat ? lngLat.map(round5).join(", ") : <em>null</em>}
            </div>
          );
        })}
      </div> */}
    </div>
  );
}

export default React.memo(ControlPanel);
