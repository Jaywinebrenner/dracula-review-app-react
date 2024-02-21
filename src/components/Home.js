
import React, {useState, useEffect, useContext} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";
import AddDraculaModal from './AddDraculaModal';
import AverageRating from './AverageRating';
import firebase from "./firebase"
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../contexts/AuthContext';
import AreYouSure from "./AreYouSure";
import Dropdown from 'react-dropdown';

 /* eslint-disable */ 
 import { ModalContext } from '../contexts/ModalContext.js';

function Home({handleLoading, handleDetailIsOpen, detailIsOpen}) {

  const { 
    addDraculaModalIsOpen,
    handleAddDraculaModalOpen,
    handleAddDetailOpen,

  } = useContext(ModalContext);

  const { currentUser } = useAuth();
  const [ allDraculas, setAllDraculas] = useState('')
  // const [ isAddDraculaModalShowing, setIsAddDraculaModalShowing] = useState(false)
  const [allReviews, setAllReviews] = useState();
  const [isAreYouSureShowing, setIsAreYouSureShowing] = useState(false);
  const [draculaToDelete, setDraculaToDelete] = useState()


  // const toggleAddDraculaModal = () => {
  //     setIsAddDraculaModalShowing((prevExpanded) => !prevExpanded)
  // } 
  const toggleAreYouSure = () => {
    setDraculaToDelete()
    setIsAreYouSureShowing((prevExpanded) => !prevExpanded)
} 
  const draculasRef = firebase.firestore().collection("draculas");
  const reviewsRef = firebase.firestore().collection("reviews");
  const auth = firebase.auth();

  const [dropDownValue, setDropdownValue] = useState('Filter Draculas');
  const defaultOption = 'Filter Draculas';
  const handleDropdownChange = (e) => {
    setDropdownValue(e.value);
  }
  const [options, setOptions ]= useState([
    'Alphabetize Draculas', 'Most Popular Draculas', 'Least Popular Draculas'
  ]);

    useEffect(() => {

      draculasRef.onSnapshot(snap => {
        const data = snap.docs.map(doc => doc.data() )
        setAllDraculas(data)
        allDraculas && console.log("ALL DRACULAS", allDraculas)
        handleLoading(false)
      });

      reviewsRef.onSnapshot(snap => {
        const reviews = snap.docs.map(doc => doc.data())
        setAllReviews(reviews)
        let scores = reviews.map((rev) => rev.score)
        });
    
      return null
    
      }, []);

      const clickDelete = (id) => {
        setDraculaToDelete(id)
        toggleAreYouSure(true)
      }

        const deleteDracula = (id) => {
          console.log("id", id)
          draculasRef.doc(id).delete();
          const revs = allReviews.filter((rev) => rev.dracula_id === id)

        }


      const filterSet = () => {
        if(dropDownValue === "Alphabetize Draculas") {
          allDraculas.sort(function(a, b){
            if(a.name.toLowerCase() < b.name.toLowerCase()) { return -1; }
            if(a.name.toLowerCase() > b.name.toLowerCase()) { return 1; }
            return 0;
        })
        }
        if(dropDownValue === "Most Popular Draculas") {
          allDraculas.sort(function(a, b){
            if(b.scores < a.scores) { return -1; }
            if(b.scores > a.score) { return 1; }
            return 0;
        })
        }        
        if(dropDownValue === "Least Popular Draculas") {
          allDraculas.sort(function(a, b){
            if(a.scores < b.scores) { return -1; }
            if(a.scores > b.score) { return 1; }
            return 0;
        })
        }
      }
      filterSet();

  return (
    <div className={`home ${detailIsOpen ? 'modal-showing' : null}`}> 
  {/* <div className={`home ${detailIsOpen || loginIsOpen || signupIsOpen ? 'modal-showing' : null}`}>  */}

     
      <div className="subheader-wrapper">
        <h1 className="subheader">Draculas to Review</h1>
        <FontAwesomeIcon onClick={() => handleAddDraculaModalOpen()} className="plus-drac" size='3x' icon={currentUser && faPlusCircle} />
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
            </div>   
      </div>
      <div className="dracula-wrap">
        {allDraculas && allDraculas.map((dracula) => (
          <div onClick={() => handleAddDetailOpen()} className='single-dracula' key={dracula.id}>
            <Link to={{
              pathname: `/detail/${dracula.id}`,
              state: {
                allDraculas: allDraculas,
                thisDraculaId: dracula.id,
              }

            }}>
            <img className="dracula-image" src={dracula.image_url} />
            </Link>
            <div className="trash-wrapper" onClick={() => clickDelete(dracula.id)}>
                <p className="drac-name">{dracula.name}</p>
                  { 
                    currentUser &&
                    (currentUser.uid === dracula.userId)
                      ? <FontAwesomeIcon className="drac-trash" size='1x' icon={faTrashAlt}/>
                      : null
                  }
              
            </div>
            <AverageRating size={"1x"} rating={dracula.scores}/>
          </div>
     ))}
        </div>
      {addDraculaModalIsOpen && <AddDraculaModal />}
      {isAreYouSureShowing && <AreYouSure setAnyModalOpen draculaToDelete={draculaToDelete} deleteDracula={deleteDracula} toggleAreYouSure={toggleAreYouSure}/>}
      </div>
  );
}

export default Home;
