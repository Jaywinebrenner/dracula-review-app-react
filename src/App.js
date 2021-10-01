
import './App.css';
import Home from './components/Home.js'
import Registration from './components/Registration';
import useCollapse from 'react-collapsed';
import React, {useState, useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import SignupModal from './components/SignupModal';
import LoginModal from './components/LoginModal';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';




 /* eslint-disable */ 


function App() {

  const [isExpanded, setExpanded] = useState(false);
  const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded, setExpanded });
  const [isSignupModalShowing, setIsSignupModalShowing] = useState(false);
  const [isLoginModalShowing, setIsLoginModalShowing] = useState(false);
  const [ isHoverDivShowing, setIsHoverDivShowing ] = useState(false);
  const [options, setOptions ]= useState([
    'All Draculas', 'Most Popular Draculas', 'Least Popular Draculas', 'Most Commented on Draucla'
  ]);

  const [dropDownValue, setDropdownValue] = useState('one')

  const defaultOption = 'All Draculas'

  const handleDropdownChange = (e) => {
    setDropdownValue(e.value);
  }

  const getInitialDropdownState = () => {
    return {selectValue:'all'};
  }

  getInitialDropdownState()


  

  const toggleSignupModal = () => {
    setIsSignupModalShowing((prevExpanded) => !prevExpanded)
    setIsHoverDivShowing(false)
  } 
  const toggleLoginModal = () => {
    setIsLoginModalShowing((prevExpanded) => !prevExpanded)
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
        <div onClick={() => toggleLoginModal()} className="login-button"><p>Login</p></div>
        <div onClick={() => alert("SUP")} className="logout-button"><p>Logout</p></div>
        <div onClick={() => toggleSignupModal()} className="signup-button"><p>Sign Up</p></div>
      </div>}
  
      <div className="title-wrapper">
        <h1 className="app-title">Dracula Review</h1>
        <h2>Find, Rate and Upload Draculas</h2>
        <p>Full CRUD Portfolio piece powered by Ruby on Rails and React</p>
      </div>
            {/* <select defaultValue={"one"} 
            onChange={handleDropdownChange} 
            >
                <option className="option"  value="all">All Draculas</option>
                <option className="option" value="popular">Most Popular Draculas</option>
                <option className="option" value="unpopular">Most Unpopular Draculas</option>
              </select> */}
      <div id="subnav" className="subnav-bar">
          <div className="subnav-top"> 
          <div className="filter-wrapper">
              <Dropdown 
              className="dropdown"
                options={options} 
                onChange={handleDropdownChange} 
                value={defaultOption} 
                placeholder="Select an option" 
                controlClassName='dropdown-control'
                placeholderClassName='dropdown-placeholder'
                menuClassName='dropdown-menu'
                arrowClassName='dropdown-arrow'
                arrowClosed={<span className="arrow-closed" />}
                arrowOpen={<span className="arrow-open" />}
               />
               {/* <CustomDropDown/> */}
              {/* <p>{message}</p> */}
            </div>       
              {/* <h3 {...getToggleProps({
                  onClick: () => openNav(),
                  })}>Filter Draculas</h3> */}  
              {/* <FontAwesomeIcon className="chevron" size='1x' icon={faChevronLeft} /> */}
          </div>
          {<section className="subnav-bottom" {...getCollapseProps()}>   
           {/* <Registration/> */}
          
            </section>}
        </div>



      <Home/>
      {isLoginModalShowing && <LoginModal toggleLoginModal={toggleLoginModal}/>}
      {isSignupModalShowing && <SignupModal toggleSignupModal={toggleSignupModal}/>}
    </div>
 
  );
}

export default App;
