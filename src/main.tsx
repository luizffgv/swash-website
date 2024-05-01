import React from "react";
import ReactDOM from "react-dom/client";
import { throwIfNull } from "@luizffgv/ts-conversions";
import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(throwIfNull(document.querySelector("#root"))).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
