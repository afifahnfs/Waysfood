import { createContext, useMemo, useReducer, useState } from "react";

export const LocationContext = createContext();

const domisili = {
  location: {},
  lat: {},
  lng: {},
};

const reducer = (state, action) => {
  const { type, payload } = action;
  // type = status
  // payload = data

  switch (type) {
    case "ADD_DOMISILI":
      return {
        location: payload,
        lat: payload,
        lng: payload,
      };
    case "EMPTY_DOMISILI":
      return {
        location: {},
        lat: {},
        lng: {},
      };
    default:
      throw new Error();
  }
};

export const LocationContextProvider = ({ children }) => {
  const [location, setLocation] = useReducer(reducer, domisili);

  return (
    <LocationContext.Provider value={[location, setLocation]}>
      {children}
    </LocationContext.Provider>
  );
};
