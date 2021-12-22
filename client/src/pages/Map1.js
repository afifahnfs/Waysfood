import React, { useState, useCallback, useRef } from "react";
import ReactMapGL, {
  Marker,
  NavigationControl,
  GeolocateControl,
} from "react-map-gl";

import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";

import Geocoder from "react-map-gl-geocoder";
import ControlPanel from "../components/control-panel";
import Pin from "../components/pin";

const navStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  padding: "10px",
};

function MapCoba() {
  const [viewport, setViewport] = useState({
    // width: 960,
    // height: 500,
    latitude: -6.1754137,
    longitude: 106.8251358,
    zoom: 15,
  });

  const navControlStyle = {
    right: 10,
    top: 10,
  };

  const geolocateControlStyle = {
    right: 10,
    top: 10,
  };

  const [marker, setMarker] = useState({
    latitude: -6.1754137,
    longitude: 106.8251358,
  });
  const [events, logEvents] = useState({});

  const onMarkerDragStart = useCallback((event) => {
    logEvents((_events) => ({ ..._events, onDragStart: event.lngLat }));
  }, []);

  const onMarkerDrag = useCallback((event) => {
    logEvents((_events) => ({ ..._events, onDrag: event.lngLat }));
  }, []);

  const onMarkerDragEnd = useCallback((event) => {
    logEvents((_events) => ({ ..._events, onDragEnd: event.lngLat }));
    setMarker({
      longitude: event.lngLat[0],
      latitude: event.lngLat[1],
    });
  }, []);

  const geocoderContainerRef = useRef();
  const mapRef = useRef();
  const handleViewportChange = useCallback(
    (newViewport) => setViewport(newViewport),
    []
  );

  // if you are happy with Geocoder default settings, you can just use handleViewportChange directly
  const handleGeocoderViewportChange = useCallback(
    (newViewport) => {
      const geocoderDefaultOverrides = { transitionDuration: 1000 };

      console.log({ ...newViewport });
      console.log({ ...geocoderDefaultOverrides });

      return handleViewportChange({
        ...newViewport,
        ...geocoderDefaultOverrides,
      });
    },
    [handleViewportChange]
  );

  return (
    <>
      <ReactMapGL
        {...viewport}
        ref={mapRef}
        width="960px"
        height="500px"
        mapboxApiAccessToken="pk.eyJ1IjoiYXJpc2EwMiIsImEiOiJja3c4eWlkZDIwcXoxMnhwOW4wb2h3MHE4In0.gZNl6DdFEdxMxFK_k2GtiA"
        onViewportChange={handleViewportChange}
        mapStyle="mapbox://styles/mapbox/streets-v11"
      >
        <Geocoder
          mapRef={mapRef}
          containerRef={geocoderContainerRef}
          onViewportChange={handleGeocoderViewportChange}
          mapboxApiAccessToken="pk.eyJ1IjoiYXJpc2EwMiIsImEiOiJja3c4eWlkZDIwcXoxMnhwOW4wb2h3MHE4In0.gZNl6DdFEdxMxFK_k2GtiA"
          position="top-left"
        />

        <NavigationControl style={navControlStyle} />

        <GeolocateControl
          style={geolocateControlStyle}
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
        />

        <Marker
          longitude={marker.longitude}
          latitude={marker.latitude}
          offsetTop={-20}
          offsetLeft={-10}
          draggable
          onDragStart={onMarkerDragStart}
          onDrag={onMarkerDrag}
          onDragEnd={onMarkerDragEnd}
        >
          {/* <Room style={{ fontSize: viewport.zoom * 5, color: "red" }} /> */}
          <Pin size={20} />
        </Marker>

        <ControlPanel events={events} />
      </ReactMapGL>
    </>
  );
}
export default MapCoba;
