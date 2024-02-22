
import React, { useState, useEffect, useContext } from 'react'
import firebase from "./firebase.js"
import { useAuth } from '../contexts/AuthContext.js';
import loadingGif from '../assets/loadingGif.gif'
<img src={loadingGif} alt="loading..." /> 
 /* eslint-disable */ 

 import { ModalContext } from '../contexts/ModalContext.js';

function AreYouSureDeleteReview() {
    const reviewsRef = firebase.firestore().collection("reviews");
    const { 
        areYouSureDeleteReviewOpen,
        handleAreYouSureOpen,
        draculaToDelete,
        clickedReviewToEdit,
        handleAreYouSureDeleteReviewOpen
        
    } = useContext(ModalContext);
    console.log("clickedReviewToDELETE", clickedReviewToEdit)

    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    const clickYesToDelete = (id) => {
        console.log("DELETE id", id)
        reviewsRef.doc(id.id).delete();
        handleAreYouSureDeleteReviewOpen()
    }

    

    return (
         <div className="modal-page">
            <div className="modal-wrapper">
                <div className="modal-content">
                    <div className="modal-top">
                        <h1>Are You Sure you want to delete this Review?</h1>
                    </div>

                   <div className="are-you-sure-modal-body">
                       
                        <div onClick={() => clickYesToDelete(clickedReviewToEdit)}className="yes-button"><h1 className="yes-text">YES</h1></div>
                        <div onClick={() => handleAreYouSureDeleteReviewOpen()} className="no-button"><h1 className="yes-text">CANCEL</h1></div>
                    </div>

                </div>
                {isLoading &&<div className="modal-content"><img className="loading-gif" src={loadingGif} alt="loading..." /> </div>}
            </div>
      </div>
  );
}

export default AreYouSureDeleteReview;
