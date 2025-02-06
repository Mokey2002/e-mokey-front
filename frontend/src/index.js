import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import store,{persistor} from "./Components/redux/store";
import { PersistGate } from 'redux-persist/integration/react';
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from 'react-router-dom';

// importing css stylesheet to use the bootstrap class
// add this line only in this file
import "bootstrap/dist/css/bootstrap.min.css"; 
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
     </PersistGate>
    </Provider>
  </React.StrictMode>,
  //document.getElementById("root")
);
reportWebVitals();