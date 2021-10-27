
import React, { useState } from 'react'
import {useAuth} from '../contexts/AuthContext';
import Rate from './Rate.js'
 /* eslint-disable */ 
 import firebase from "./firebase"

function AddReviewModal({toggleModal, thisDraculaId, thisDracula, starAverage, size}) {

    const [reviewTitle, setReviewTitle] = useState('')
    const [reviewBody, setReviewBody] = useState('')
    const [rating, setRating] = useState(0)
    const {currentUser} = useAuth()
    const draculasRef = firebase.firestore().collection("draculas")
    const reviewsRef = firebase.firestore().collection("reviews")

    const submitForm = async () => {
        if(!reviewTitle){
            return alert("Add a title!")
        }
        if(!reviewBody){
            return alert("Add a review!")
        }
        if(!rating){
            return alert("Rate that Draucla first!")
        }
        const review = { title: reviewTitle, description: reviewBody, score: rating, dracula_id: thisDraculaId}

        reviewsRef.doc().set(review)
            .catch(function(error) {
                console.error("Error adding review: ", error);
            });
        toggleModal();

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
      <div className="modal-page">
            <div className="modal-wrapper">
                <div className="modal-content">
                   <div className="modal-top">
                        <h1>Add a Review</h1>
                        <div onClick={() => toggleModal()} className="x">x</div>
                   </div>

                   <div className="modal-body">
                      
                   <div className="form">
                        <p>Rate this Dracula</p>
                        <Rate 
                            rating={rating} 
                            onRating={(rate)=> setRating(rate)}
                        />
                        <p>Review Title</p>
                        <input
                        className="review-title-textbox"
                            type="text"
                            value={reviewTitle}
                            onChange={e => setReviewTitle(e.target.value)}
                        />

                        <p>Review</p>
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
  );
}

export default AddReviewModal;
