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
  const [detailIsOpen, setDetailIsOpen] = useState(false);
  const [loginIsOpen, setLoginIsOpen] = useState(false);
  const [signupIsOpen, setSignupIsOpen] = useState(false);
  const [addDraculaIsOpen, setAddDraculaIsOpen] = useState(false);
  const [areYouSureIsOpen, setAreYouSureIsOpen] = useState(false);

  const handleDetailIsOpen = () => {
    setDetailIsOpen(prev => !prev);
  };

  const handleLoginIsOpen = () => {
    setLoginIsOpen(prev => !prev);
  };

  const handleSignupIsOpen = () => {
    setSignupIsOpen(prev => !prev);
  };

  const handleAddDraculaIsOpen = () => {
    setAddDraculaIsOpen(prev => !prev);
  };

  const handleAreYouSureIsOpen = () => {
    setAreYouSureIsOpen(prev => !prev);
  };

  return (
    <React.StrictMode>
      <BrowserRouter>
        <AuthProvider>
          <ModalProvider> {/* Wrap your components with ModalProvider here */}
            <Switch>
              <Route path="/" render={(props) => <App {...props} detailIsOpen={detailIsOpen} handleDetailIsOpen={handleDetailIsOpen} handleLoginIsOpen={handleLoginIsOpen} loginIsOpen={loginIsOpen} handleSignupIsOpen={handleSignupIsOpen} signupIsOpen={signupIsOpen} handleAddDraculaIsOpen={handleAddDraculaIsOpen} addDraculaIsOpen={addDraculaIsOpen} handleAreYouSureIsOpen={handleAreYouSureIsOpen} areYouSureIsOpen={areYouSureIsOpen} />} />
            </Switch>

            <Switch>
              <Route path="/detail/:slug" render={(props) => <Detail {...props} detailIsOpen={detailIsOpen} handleDetailIsOpen={handleDetailIsOpen} />} />
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
