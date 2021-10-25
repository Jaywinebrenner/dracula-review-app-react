import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Detail from './components/Detail.js'
import {AuthProvider} from './contexts/AuthContext'


ReactDOM.render(
  
  <React.StrictMode>
    <BrowserRouter>
    <AuthProvider>
      <Switch>
        <Route path="/" component={App}/>
      </Switch>

      <Switch>
        <Route path="/detail/:slug" component={Detail}/>
      </Switch>
{/* 
    <Route exact path="/">
      <App />
    </Route>
    <Route exact path="/detail/:id">
      <Detail />
    </Route> */}

</AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
