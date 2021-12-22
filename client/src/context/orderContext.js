import { createContext, useMemo, useReducer, useState } from "react";

export const OrderContext = createContext({
  orderMenus: {
    carts: [
      {
        item: {},
        qty: 0,
      },
    ],
    subtotal: 0,
  },
  setOrderMenus: () => {},
});

// const initialState = {
//     carts: [],
//     subtotal: 0,
// };

// const reducer = (state, action) => {
//     const { type, payload, total } = action;
//     // type = status
//     // payload = data

//     switch (type) {
//         case "ADD_CART":
//             return {
//                 carts: payload,
//                 subtotal: total,
//             };
//         case "EMPTY_CART":
//             return {
//                 carts: [],
//                 subtotal: 0,
//             };
//         default:
//             throw new Error();
//     }
// };

export const OrderContextProvider = ({ children }) => {
  const [orderMenus, setOrderMenus] = useState({
    carts: [],
    subtotal: 0,
  });
  const value = useMemo(
    () => ({
      orderMenus,
      setOrderMenus,
    }),
    [orderMenus]
  );

  return (
    <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
  );
};
