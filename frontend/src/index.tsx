import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloProvider } from '@apollo/client';
import client from './graphql/ApolloClient';
import { ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#5ACCCC', // Turquoise
      contrastText: '#FFFFFF', // White
      dark: '#335C6E', // Steel Blue
      light: '#FABD33', // Yellow
    },
    secondary: {
      main: '#CFFAFA', // Turquoise Light
      dark: '#F76434', // Orange Red
      light: '#4AA088', // Teal
      contrastText: '#FAAD00', // Yellow Dark
     
    },
    common: {
      white: '#FFFFFF', // White 

    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
