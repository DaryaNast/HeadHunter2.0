import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {Provider} from "react-redux";
import {store} from "./store/store.ts";
import {MantineProvider, createTheme} from "@mantine/core";
import {BrowserRouter} from "react-router-dom";

const theme = createTheme({
    fontFamily: 'Open Sans, sans-serif',
    primaryColor: 'blue',

})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
          <MantineProvider theme={theme}>
              <Provider store={store}>
                  <App />
              </Provider>
          </MantineProvider>
      </BrowserRouter>
  </StrictMode>,
)
