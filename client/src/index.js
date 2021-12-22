import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { UserContextProvider } from "./context/userContext";
import { OrderContextProvider } from "./context/orderContext";

// Init Client
const client = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <UserContextProvider>
      <OrderContextProvider>
        <QueryClientProvider client={client}>
          <Router>
            <App />
          </Router>
        </QueryClientProvider>
      </OrderContextProvider>
    </UserContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
