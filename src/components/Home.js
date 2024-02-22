import React, { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import AddDraculaModal from './AddDraculaModal';
import AverageRating from './AverageRating';
import firebase from "./firebase";
import Dropdown from 'react-dropdown';
import { ModalContext } from '../contexts/ModalContext.js';
import { useAuth } from '../contexts/AuthContext';

function Home({ handleLoading }) {
    const { handleAddDraculaModalOpen, handleAddDetailOpen, handleAreYouSureOpen, setDraculaToDelete, draculaToDelete, removeHome } = useContext(ModalContext);
    const { currentUser } = useAuth();
    const [allDraculas, setAllDraculas] = useState([]);
    const [allReviews, setAllReviews] = useState([]);
    const [dropDownValue, setDropdownValue] = useState('Filter Draculas');
    const [draculasToDisplay, setDraculasToDisplay] = useState(9);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const draculasRef = firebase.firestore().collection("draculas");
    const reviewsRef = firebase.firestore().collection("reviews");

    const handleDropdownChange = (e) => {
        setDropdownValue(e.value);
    }

    useEffect(() => {
        const unsubscribe = draculasRef.onSnapshot(snapshot => {
            const data = snapshot.docs.map(doc => doc.data());
            setAllDraculas(data);
            handleLoading(false);
        });

        reviewsRef.onSnapshot(snapshot => {
            const reviews = snapshot.docs.map(doc => doc.data());
            setAllReviews(reviews);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const clickDelete = (id) => {
        setDraculaToDelete(id);
        handleAreYouSureOpen();
    }

    const loadMoreDraculas = () => {
        setDraculasToDisplay(prevCount => prevCount + 9);
    }

    const filteredDraculas = () => {
        let filtered = [...allDraculas];

        if (dropDownValue === "Alphabetize Draculas") {
            filtered.sort((a, b) => a.name.localeCompare(b.name));
        } else if (dropDownValue === "Most Popular Draculas") {
            filtered.sort((a, b) => b.scores - a.scores);
        } else if (dropDownValue === "Least Popular Draculas") {
            filtered.sort((a, b) => a.scores - b.scores);
        }

        return filtered.slice(0, draculasToDisplay);
    }

    return (
        <div className={`home ${removeHome() ? 'modal-showing' : null}`}>
            <div className="subheader-wrapper">
                <h1 className="subheader">Draculas to Review</h1>
                <div className='add-dracula-icon-wrapper'>
                  <FontAwesomeIcon onClick={() => handleAddDraculaModalOpen()} className="plus-drac" size='3x' icon={currentUser && faPlusCircle} />
                  {currentUser && <p>Add Dracula</p>}
                </div>
                <div className="filter-wrapper">
                <Dropdown
                        className="dropdown"
                        options={['Alphabetize Draculas', 'Most Popular Draculas', 'Least Popular Draculas']}
                        onChange={handleDropdownChange}
                        value={dropDownValue}
                        placeholder="Select an option"
                        controlClassName='dropdown-control'
                        placeholderClassName='dropdown-placeholder'
                        menuClassName='dropdown-menu'
                        arrowClassName={`dropdown-arrow ${isDropdownOpen ? 'open' : ''}`}
                        arrowClosed={<span className="arrow-closed" />}
                        arrowOpen={<span className="arrow-open" />}
                        onOpen={() => setIsDropdownOpen(true)}
                        onClose={() => setIsDropdownOpen(false)}
                    />
                </div>
            </div>
            <div className="dracula-wrap">
                {filteredDraculas().map((dracula) => (
                    <div className='single-dracula' key={dracula.id}>
                        <Link
                            onClick={() => handleAddDetailOpen()}
                            to={{
                                pathname: `/detail/${dracula.id}`,
                                state: {
                                    allDraculas: allDraculas,
                                    thisDraculaId: dracula.id,
                                }
                            }}>
                            <img className="dracula-image" src={dracula.image_url} />
                        </Link>
                        <div className="trash-wrapper">
                            <p className="drac-name">{dracula.name}</p>
                            {currentUser && currentUser.uid === dracula.userId && (
                                <FontAwesomeIcon onClick={() => clickDelete(dracula.id)} className="drac-trash" size='1x' icon={faTrashAlt} />
                            )}
                        </div>
                        <div style={{ pointerEvents: "none" }}>
                            <AverageRating size={"1x"} rating={dracula.scores} />
                        </div>
                    </div>
                ))}
            </div>
            {allDraculas.length > draculasToDisplay && (
                <button onClick={loadMoreDraculas}>Load More</button>
            )}
        </div>
    );
}

export default Home;
