import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Detail from './components/Detail.js';
import { AuthProvider } from './contexts/AuthContext';
import { ModalProvider } from './contexts/ModalContext'; 

const Index = () => {

  return (
    <React.StrictMode>
      <BrowserRouter>
        <AuthProvider>
          <ModalProvider> 
            <Switch>
              <Route path="/" render={(props) => <App {...props} />} />
            </Switch>

            <Switch>
              <Route path="/detail/:slug" render={(props) => <Detail {...props}/>} />
            </Switch>
          </ModalProvider>
        </AuthProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
};

ReactDOM.render(
  <Index />,
  document.getElementById('root')
);

reportWebVitals();
