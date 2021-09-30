
import './App.css';
import Home from './components/Home.js'
import Registration from './components/Registration';
import useCollapse from 'react-collapsed';
import React, {useState} from 'react'

 /* eslint-disable */ 


function App() {

  const [isExpanded, setExpanded] = useState(false);
  const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded, setExpanded });

  const openNav = () => {
    setExpanded((prevExpanded) => !prevExpanded)
  }

  return (

    <div className="App">
      <div className="title-wrapper">
        <h1 className="app-title">Dracula Review</h1>
        <h2>Find, Rate and Upload Draculas</h2>
        <p>Full CRUD Portfolio piece powered by Ruby on Rails and React</p>
      </div>
      <div id="nav" className="nav-bar">
          <div className="nav-top"> 
              <h3 {...getToggleProps({
                  onClick: () => openNav(),
                  })}>Sign up</h3>
              {/* <FontAwesomeIcon className="chevron" size='1x' icon={faChevronLeft} /> */}
          </div>
          {<section className="nav-bottom" {...getCollapseProps()}>   
           <Registration/>
          </section>}
      </div>



      <Home/>
    </div>
 
  );
}

export default App;
