
import React, { useState, useContext } from 'react'
import {useAuth} from '../contexts/AuthContext';
import Rate from './Rate.js'
 /* eslint-disable */ 
 import firebase from "./firebase"
 import SignupModal from './SignupModal';
import LoginModal from './LoginModal';

import { ModalContext } from '../contexts/ModalContext.js';

function AddReviewModal({ thisDraculaId, thisDracula, starAverage, size}) {

    const { handleAddReviewOpen } = useContext(ModalContext);

    const [reviewTitle, setReviewTitle] = useState('')
    const [reviewBody, setReviewBody] = useState('')
    const [rating, setRating] = useState(0)
    const {currentUser} = useAuth()
    const draculasRef = firebase.firestore().collection("draculas")
    const reviewsRef = firebase.firestore().collection("reviews")

    const submitForm = async () => {

        if(!currentUser){
            return alert("Please sign up to review a Dracula")
        }
        if(!reviewTitle){
            return alert("Add a title!")
        }
        if(!reviewBody){
            return alert("Add a review!")
        }
        if(!rating){
            return alert("Rate that Draucla first!")
        }
        const review = { title: reviewTitle, description: reviewBody, score: rating, dracula_id: thisDraculaId, reviewerName: currentUser.multiFactor.user.displayName}

        reviewsRef.doc().set(review)
            .catch(function(error) {
                console.error("Error adding review: ", error);
            });
            handleAddReviewOpen();

        const getNewAverage = () => {
            let newAverage = null;
            if(!starAverage){
                newAverage = rating;
                return newAverage
            } else {
                newAverage = (starAverage + rating) / 2
                return newAverage 
            }
        }
        let newAverage = getNewAverage()

        draculasRef.doc(thisDraculaId).update({
            scores: newAverage
        })
        .catch(function(error) {
            console.error("Error adding Star Average to the Dracula: ", error);
        });


        // photoURL field on the currentUser object is what acutally stores the amout of reviews a user had made.
        let reviewNumber = null
        if(currentUser.photoURL){
    
            reviewNumber = parseInt(currentUser.photoURL) - 1;
            currentUser.updateProfile({
                photoURL: reviewNumber
            })
        } 
      }

  return (
    <>

      <div className="modal-page">
            <div className="modal-wrapper">
                <div className="modal-content">
                   <div className="modal-top">
                        <h1>Add a Review</h1>

                        <div onClick={() => handleAddReviewOpen()} className="x"><img src="/cross.png"/></div>
                        
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

export default AddReviewModal;
