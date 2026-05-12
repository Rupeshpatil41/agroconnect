import React from "react";

import ReactDOM from "react-dom/client";

import App from "./App";

import {
  NotificationProvider,
} from "./context/NotificationContext";

import {
  ToastContainer,
} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const root =
  ReactDOM.createRoot(
    document.getElementById(
      "root"
    )
  );

root.render(
  <NotificationProvider>

    <App />

    <ToastContainer
      position="top-right"
    />

  </NotificationProvider>
);