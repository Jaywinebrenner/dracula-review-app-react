
import './App.css';
import Home from './components/Home.js'
import Registration from './components/Registration';
import Loading from './components/Loading';
import useCollapse from 'react-collapsed';
import React, {useState, useEffect, useContext} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import SignupModal from './components/SignupModal';
import LoginModal from './components/LoginModal';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { useAuth } from './contexts/AuthContext';
import Popup from './components/Popup';
import AddDraculaModal from './components/AddDraculaModal.js';
import AreYouSure from './components/AreYouSure.js';
import EditReviewModal from './components/EditReviewModal.js';


import { ModalContext } from './contexts/ModalContext.js';
import AreYouSureDeleteReview from './components/AreYouSureDeleteReview.js';



function App({detailIsOpen, handleDetailIsOpen}) {

  const { 
    loginIsOpen, 
    handleLoginIsOpen, 
    signupIsOpen, 
    handleSignupIsOpen,
    addDraculaModalIsOpen,
    handleAddDraculaModalOpen,
    areYouSureIsOpen,
    handleAreYouSureOpen,
    editReviewIsOpen,
    handleAreYouSureDeleteReviewOpen,
    areYouSureDeleteReviewOpen,

    addDetailIsOpen,
    addReviewIsOpen
  } = useContext(ModalContext);

  console.log("loginIsOpen:", loginIsOpen);
console.log("signupIsOpen:", signupIsOpen);
console.log("addDraculaModalIsOpen:", addDraculaModalIsOpen);
console.log("addDetailIsOpen:", addDetailIsOpen);
console.log("addReviewIsOpen:", addReviewIsOpen);
console.log("areYouSureIsOpen:", areYouSureIsOpen);
console.log("editReviewIsOpen:", editReviewIsOpen);
console.log("areYouSureDeleteReviewOpen:", areYouSureDeleteReviewOpen);


  console.log("login is open CONTEXT", loginIsOpen)

  const [isExpanded, setExpanded] = useState(false);
  const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded, setExpanded });
  const [ isHoverDivShowing, setIsHoverDivShowing ] = useState(false);
  const [options, setOptions ]= useState([
    'Alphabetize Draculas', 'Most Popular Draculas', 'Least Popular Draculas'
  ]);
  const [loading, setLoading] = useState(false);
  const [popupOpen, setPopupOpen] = useState(true)

  const [dropDownValue, setDropdownValue] = useState('Filter Draculas');

  const defaultOption = 'Filter Draculas';

  const { currentUser, logout } = useAuth();
  // console.log("CURRENT USER", currentUser);

  const handleLoading = (toggle) => {
    setLoading(toggle)
  }
  const toggleHoverDiv = () => {
    setIsHoverDivShowing((prevExpanded) => !prevExpanded)
  } 
  const handleLogout = () => {
    logout()
  }


  return (
  <>
<div className={`App`}>

      {/* {popupOpen && <Popup handleOpenPopup={handleOpenPopup}/>} */}
      <div onMouseEnter={toggleHoverDiv} onMouseLeave={toggleHoverDiv} className="nav">
        <div className="user-icon-wrapper">
            <img src="/dracula-icon.png"/>
        </div>
      </div>
      {isHoverDivShowing && 
      <div onMouseEnter={toggleHoverDiv} onMouseLeave={toggleHoverDiv} className="hover-wrapper">
        {!currentUser && <div onClick={() => handleLoginIsOpen()} className="login-button"><p>Login</p></div>}
        {currentUser && <div onClick={() => handleLogout()} className="logout-button"><p>Logout</p></div>}
        {!currentUser && <div onClick={() => handleSignupIsOpen()} className="signup-button"><p>Sign Up</p></div>}
      </div>}


        <div class="content">

        <div className='logo-wrapper'>
          <img src="/teeth-logo.png"/>
        </div>
        <div className='logo-wrapper-two'>
          <img src="/teeth-logo.png"/>
        </div>

        <div class="col"></div>
        <div class="col"></div>
        <div class="col"></div>
        <div class="col"></div>
        <div class="col"></div>
        <div class="col"></div>
        <div class="col"></div>
        <div class="col"></div>
        <div class="col"></div>
        <div class="col"></div>

        <div class="col"></div>
        <div class="col"></div>
        <div class="col"></div>
        <div class="col"></div>
        <div class="col"></div>
        <div class="col"></div>
        <div class="col"></div>
        <div class="col"></div>
        <div class="col"></div>
        <div class="col"></div>

        <div class="col"></div>
        <div class="col"></div>
        <div class="col"></div>
        <div class="col"></div>
        <div class="col"></div>
        <div class="col"></div>
        <div class="col"></div>
        <div class="col"></div>
        <div class="col"></div>
        <div class="col"></div>

        <div className="title-wrapper text">
          {currentUser ? <h5 className="welcome">Welcome {currentUser.displayName}</h5> : <h5 className="welcome">Welcome to</h5>}
          <h1 className="app-title">Dracula Review</h1>
          <h2>Find, Rate, Review and Upload Draculas</h2>
          <p>Full CRUD Portfolio piece powered by Firebase and React by Jay Winebrenner</p>
        </div>

</div>


      <div id="subnav" className="subnav-bar">
          {/* <div className="subnav-top"> 

  
          </div> */}
          {<section className="subnav-bottom" {...getCollapseProps()}>   
           {/* <Registration/> */}
          
            </section>}
        </div>



    </div>
      {!loading && <Home dropDownValue={dropDownValue} handleLoading={handleLoading} handleDetailIsOpen={handleDetailIsOpen} detailIsOpen={detailIsOpen} loginIsOpen={loginIsOpen} signupIsOpen={signupIsOpen}/>}
      {loading && <Loading/>}
      {loginIsOpen && <LoginModal />}
      {signupIsOpen && <SignupModal />}
      {addDraculaModalIsOpen && <AddDraculaModal />}
      {/* {areYouSureIsOpen && <AreYouSure draculaToDelete={draculaToDelete} deleteDracula={deleteDracula}/>} */}
      {areYouSureIsOpen && <AreYouSure />}
      {areYouSureDeleteReviewOpen &&  <AreYouSureDeleteReview />}
      {editReviewIsOpen && <EditReviewModal/>}

</>
 
  );
}

export default App;
