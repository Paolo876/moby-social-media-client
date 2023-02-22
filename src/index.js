import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom';
import { theme } from "./materialTheme";
import { ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux';
import store from "./redux/store";
import "./index.scss"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Provider store={store}>    
          <App/>
        </Provider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
