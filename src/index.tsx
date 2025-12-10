/**
 * Application Entry Point
 * 
 * Main entry point for the React application.
 * Configures axios defaults, sets up Redux store, and renders the root App component.
 * Wraps the application in Redux Provider and React StrictMode.
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from "axios";
import {configureStore} from "./redux/configureStore";
import {Provider} from "react-redux";

// Configure axios defaults for API requests
axios.defaults.baseURL = 'http://localhost:8000/api/';
axios.defaults.withCredentials = true;

// Create Redux store
const store = configureStore();

// Get root element and create React root
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// Render the application
root.render(
  <React.StrictMode>
      <Provider store={store}>
          <App />
      </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
