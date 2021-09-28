
import React, { useState } from 'react'
import axios from 'axios'
import Rate from './Rate.js'
 /* eslint-disable */ 




function AddReviewModal({toggleModal, thisDraculaId}) {

    const [reviewTitle, setReviewTitle] = useState('')
    const [reviewBody, setReviewBody] = useState('')
    const [rating, setRating] = useState(0)



      const refreshPage = () => {
        window.location.reload(false);
      }

    const submitForm = () => {
        const review = { title: reviewTitle, description: reviewBody, score: rating, dracula_id: thisDraculaId}
        axios.post(
            `http://localhost:3000/api/v1/reviews`, {review})
        .then(response => {
          console.log(response);
          refreshPage()
        
        })
        .catch(error => console.log(error))
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
