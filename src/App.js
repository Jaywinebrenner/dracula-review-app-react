
import './App.css';
import Home from './components/Home.js'
import Registration from './components/Registration';
import useCollapse from 'react-collapsed';
import React, {useState, useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import SignupModal from './components/SignupModal';

 /* eslint-disable */ 


function App() {

  const [isExpanded, setExpanded] = useState(false);
  const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded, setExpanded });
  const [isSignupModalShowing, setIsSignupModalShowing] = useState(false);
  const [ isHoverDivShowing, setIsHoverDivShowing ] = useState(false)

  const toggleSignupModal = () => {
    setIsSignupModalShowing((prevExpanded) => !prevExpanded)
    setIsHoverDivShowing(false)
  } 
  const toggleHoverDiv = () => {
    setIsHoverDivShowing((prevExpanded) => !prevExpanded)
  } 
  const openNav = () => {
    setExpanded((prevExpanded) => !prevExpanded)
  }




  return (

    <div className="App">
      <div onMouseEnter={toggleHoverDiv} onMouseLeave={toggleHoverDiv} className="nav">
        <div className="user-icon-wrapper">
            <FontAwesomeIcon  className="user-icon" size='2x' icon={faUser} />
        </div>
      </div>
      {isHoverDivShowing && 
      <div onMouseEnter={toggleHoverDiv} onMouseLeave={toggleHoverDiv} className="hover-wrapper">
        <div onClick={() => alert("SUP")} className="login-button"><p>Login</p></div>
        <div onClick={() => alert("SUP")} className="logout-button"><p>Logout</p></div>
        <div onClick={() => toggleSignupModal()} className="signup-button"><p>Sign Up</p></div>
      </div>}
  
      <div className="title-wrapper">
        <h1 className="app-title">Dracula Review</h1>
        <h2>Find, Rate and Upload Draculas</h2>
        <p>Full CRUD Portfolio piece powered by Ruby on Rails and React</p>
      </div>
      <div id="subnav" className="subnav-bar">
          <div className="subnav-top"> 
              <h3 {...getToggleProps({
                  onClick: () => openNav(),
                  })}>Sign up | Sign Up</h3>
              <h3>Logout</h3>
              <h3>About</h3>
              {/* <FontAwesomeIcon className="chevron" size='1x' icon={faChevronLeft} /> */}
          </div>
          {<section className="subnav-bottom" {...getCollapseProps()}>   
           {/* <Registration/> */}
          </section>}
      </div>



      <Home/>
      {isSignupModalShowing && <SignupModal toggleSignupModal={toggleSignupModal}/>}
    </div>
 
  );
}

export default App;
