import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Detail from './components/Detail.js'
import { AuthProvider } from './contexts/AuthContext'

const Index = () => {
  const [detailIsOpen, setDetailIsOpen] = useState(false);
  const [loginIsOpen, setLoginIsOpen] = useState(false);
  const [signupIsOpen, setSignupIsOpen] = useState(false);

  const handleDetailIsOpen = () => {
    setDetailIsOpen(prev => !prev);
  };

  const handleLoginIsOpen = () => {
    console.log("handle LOGIN IS OPEN CLICKED")
    setLoginIsOpen(prev => !prev);
  };

  const handleSignupIsOpen = () => {
    console.log("handle SIGNUP IS OPEN CLICKED")
    setSignupIsOpen(prev => !prev);
  };

  return (
    <React.StrictMode>
      <BrowserRouter>
        <AuthProvider>
          <Switch>
            <Route path="/" render={(props) => <App {...props} detailIsOpen={detailIsOpen} handleDetailIsOpen={handleDetailIsOpen} handleLoginIsOpen={handleLoginIsOpen} loginIsOpen={loginIsOpen} handleSignupIsOpen={handleSignupIsOpen} signupIsOpen={signupIsOpen}/>} />
          </Switch>

          <Switch>
            <Route path="/detail/:slug" render={(props) => <Detail {...props} detailIsOpen={detailIsOpen} handleDetailIsOpen={handleDetailIsOpen} />} />
          </Switch>
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
