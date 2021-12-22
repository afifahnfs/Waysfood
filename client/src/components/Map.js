import React from "react";
import {
  withGoogleMap,
  GoogleMap,
  withScriptjs,
  InfoWindow,
  Marker,
  useLoadScript,
} from "@react-google-maps/api";
// import Geocode from "react-geocode";
// import Autocomplete from "react-google-autocomplete";
// import { GoogleMapsAPI } from "./MapsApi";
// Geocode.setApiKey(GoogleMapsAPI);
// Geocode.enableDebug();

const libraries = ["places"];

const mapContainerStyle = {
  width: "100vw",
  height: "100vh",
};

const center = {
  lat: 43.653225,
  lng: -79.383186,
};

export default function Map() {
  const { isLoaded, loadError } = useLoadScript({
    GoogleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
      ></GoogleMap>
    </div>
  );
}
