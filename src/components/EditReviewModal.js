import React, { useState, useContext } from 'react';
import { useAuth } from '../contexts/AuthContext.js';
import Rate from './Rate.js';
import firebase from "./firebase.js";
import { ModalContext } from '../contexts/ModalContext.js';

function EditReviewModal() {

    const { 
        handleEditReviewOpen, 
        clickedReviewToEdit,
        thisDraculaStarAverage,
        thisDraculaId
     } = useContext(ModalContext);

    const { currentUser } = useAuth();
    const draculasRef = firebase.firestore().collection("draculas");
    const reviewsRef = firebase.firestore().collection("reviews"); 

    const reviewRef = reviewsRef.doc(clickedReviewToEdit.id);
    console.log("reviewRef", reviewRef);
    console.log("clickedReviewToEdit", clickedReviewToEdit);

    const [reviewTitle, setReviewTitle] = useState(clickedReviewToEdit.title);
    const [reviewBody, setReviewBody] = useState(clickedReviewToEdit.description);
    const [rating, setRating] = useState(clickedReviewToEdit.score);

    const submitForm = async () => {
        if (!currentUser || !reviewTitle || !reviewBody || !rating) {
            return alert("Please fill out all fields before submitting the review.");
        }
    
        try {
            // Check if the document exists before attempting to update it
            const reviewSnapshot = await reviewRef.get();
            console.log("reviewSnapshot.exists", reviewSnapshot.exists)
    
            if (!reviewSnapshot.exists) {
                // No need to log an error if the document doesn't exist
                return;
            }
    
            // Document exists, proceed with updating it
            await reviewRef.update({
                title: reviewTitle,
                description: reviewBody,
                score: rating,
                reviewerName: currentUser.multiFactor.user.displayName
            });
    
            // Calculate new average rating and update the Dracula document
            // const newAverage = thisDraculaStarAverage ? (thisDraculaStarAverage + rating) / 2 : rating;

            // await draculasRef.doc(thisDraculaId).update({
            //     scores: newAverage
            // });
    
            // Update the review count on the currentUser object
            if (currentUser.photoURL) {
                const reviewNumber = parseInt(currentUser.photoURL, 10) - 1;
                await currentUser.updateProfile({
                    photoURL: reviewNumber.toString()
                });
            }
    
            // Close the edit review modal
            handleEditReviewOpen();
            console.log("Review updated successfully!");
        } catch (error) {
            console.error("Error updating review and/or Dracula: ", error);
            alert("An error occurred while updating the review and/or Dracula. Please try again later.");
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
