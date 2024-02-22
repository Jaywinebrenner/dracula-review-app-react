import React, { useState, useContext } from 'react';
import { useAuth } from '../contexts/AuthContext.js';
import Rate from './Rate.js';
import firebase from "./firebase.js";
import { ModalContext } from '../contexts/ModalContext.js';

function EditReviewModal({ thisDraculaId, starAverage }) {
    const { handleEditReviewOpen, clickedReviewToEdit } = useContext(ModalContext);
    const { currentUser } = useAuth();
    const draculasRef = firebase.firestore().collection("draculas");
    const reviewsRef = firebase.firestore().collection("reviews"); 

    const reviewRef = reviewsRef.doc(clickedReviewToEdit.id);
    console.log("reviewREf", reviewRef);

    console.log("clickedReviewToEdit", clickedReviewToEdit);

    const [reviewTitle, setReviewTitle] = useState(clickedReviewToEdit.title);
    const [reviewBody, setReviewBody] = useState(clickedReviewToEdit.description);
    const [rating, setRating] = useState(clickedReviewToEdit.score);

    const submitForm = async () => {
        if (!currentUser) {
            return alert("Please sign up to review a Dracula");
        }
        if (!reviewTitle) {
            return alert("Add a title!");
        }
        if (!reviewBody) {
            return alert("Add a review!");
        }
        if (!rating) {
            return alert("Rate that Dracula first!");
        }
    
        const reviewData = {
            title: reviewTitle,
            description: reviewBody,
            score: rating,
            reviewerName: currentUser.multiFactor.user.displayName
        };
    
        // Update the review in Firestore
        reviewRef.update(reviewData)
            .then(() => {
                console.log("Review updated successfully!");
                handleEditReviewOpen();
            })
            .catch((error) => {
                console.error("Error updating review: ", error);
            });
    
        // Calculate new average rating and update the Dracula document
        const newAverage = starAverage ? (starAverage + rating) / 2 : rating;
        draculasRef.doc(thisDraculaId).update({
            scores: newAverage
        })
        .then(() => {
            console.log("Dracula average score updated successfully!");
        })
        .catch((error) => {
            alert("Error updating Dracula average score: ", error);
        });
    
        // Update the review count on the currentUser object
        if (currentUser.photoURL) {
            const reviewNumber = parseInt(currentUser.photoURL, 10) - 1;
            currentUser.updateProfile({
                photoURL: reviewNumber.toString()
            })
            .then(() => {
                console.log("User review count updated successfully!");
            })
            .catch((error) => {
                console.error("Error updating user review count: ", error);
            });
        }
    };
    

  return (
    <>

      <div className="modal-page">
            <div className="modal-wrapper">
                <div className="modal-content">
                   <div className="modal-top">
                        <h1>Edit Your Review</h1>

                        <div onClick={() => handleEditReviewOpen()} className="x"><img src="/cross.png"/></div>
                        
                   </div>

                   <div className="modal-body">
                      
                   <div className="form">
                        <p className='rate'>Rate this Dracula</p>
                        <Rate 
                            rating={rating} 
                            onRating={(rate)=> setRating(rate)}
                        />
                        <p className='review-title'>Review Title</p>
                        <input
                        className="review-title-textbox"
                            type="text"
                            value={reviewTitle}
                            onChange={e => setReviewTitle(e.target.value)}
                        />

                        <p className='review'>Review</p>
                        <textarea 
                            className="review-textarea" 
                            name="review" 
                            rows="4"
                            cols="50"
                            type="text"
                            value={reviewBody}
                            onChange={e => setReviewBody(e.target.value)}
                            >
                        
                        </textarea>
                        
                        <button onClick={submitForm} className="submit-review-button" type="button">Submit Review</button>
                    </div>
                    </div>


                </div>
            </div>
      </div>


      </>
  );
}

export default EditReviewModal;
