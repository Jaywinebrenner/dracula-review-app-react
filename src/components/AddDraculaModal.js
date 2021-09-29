
import React, { useState } from 'react'
import axios from 'axios'
import Rate from './Rate.js'
 /* eslint-disable */ 

function AddDraculaModal({toggleAddDraculaModal}) {

    const [name, setName] = useState('')
    const [imageUrl, setImageUrl] = useState('')

      const refreshPage = () => {
        window.location.reload(false);
      }

    const submitForm = () => {
        if(!name){
            return alert("Add a dracula name!")
        }
        if(!imageUrl){
            return alert("Add a url of a dracula image!")
        }

        const dracula = { name: name, image_url: imageUrl}
        axios.post(
            `http://localhost:3000/api/v1/draculas`, {dracula})
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
                        <h1>Add a Dracula</h1>
                        <div onClick={() => toggleAddDraculaModal()} className="x">x</div>
                   </div>

                   <div className="modal-body">
                      
                   <div className="form">
                        <p>Dracula Name</p>
                        <input
                        className="review-title-textbox"
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />

                        <p>Image URL</p>
                            <input
                            className="review-title-textbox"
                                type="text"
                                value={imageUrl}
                                onChange={e => setImageUrl(e.target.value)}
                            />
                            
                            <button onClick={submitForm} className="submit-review-button" type="button">Submit Dracula</button>
                        </div>
                    </div>

                </div>
            </div>
      </div>
  );
}

export default AddDraculaModal;
