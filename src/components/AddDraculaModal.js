
import React, { useState } from 'react'
import axios from 'axios'
import Rate from './Rate.js'

 /* eslint-disable */ 

function AddDraculaModal({toggleAddDraculaModal}) {

    const [name, setName] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [image, setImage] = useState(null)
    const [imageUrlIsShowing, setImageUrlIsShowing] = useState('display')

    const toggleImageUpload = (input) => {
        setImageUrlIsShowing(input)
    }

    const fileSelectedHandler = (event) => {
        setImage(event.target.files[0])
    }

    const refreshPage = () => {
        window.location.reload(false);
      }

    const submitForm = (event) => {
        event.preventDefault();
        console.log("image", image)
        if(!name){
            return alert("Add a dracula name!")
        }
        // if(!imageUrl){
        //     return alert("Add a url of a dracula image!")
        // }

        // if (imageUrl){
        //     setImage("https://www.costumerusuk.com/wp-content/uploads/images/products/p-25361-5549.jpg")
        // }
        const dracula = { name: name, image_url: imageUrl, dracula_image: image}
       
        for (var key of dracula.entries()) {
			console.log(key[0] + ', ' + key[1])
		}

         axios.post(
            `http://localhost:3000/api/v1/draculas`, {dracula})
        .then(response => {
            alert("response", response)
          console.log("RESPONSE AFTER DRACULA UPLOAD",response);
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
                        <div className="upload-buttons-wrapper">

                            <div onClick={() => toggleImageUpload('url')} className="upload-image-button-left">Upload Image Url</div>

                            <div onClick={() =>toggleImageUpload('image')}className="upload-image-button-right">Upload Image File</div>
                        </div>

                        {imageUrlIsShowing === 'url' && <div>
                            <p>Image URL</p>
                                <input
                                className="review-title-textbox"
                                    type="text"
                                    value={imageUrl}
                                    onChange={e => setImageUrl(e.target.value)}
                            />
                        </div>}
                        {imageUrlIsShowing === 'image' && <div>
                            <p>Image from Computer</p>
                                <input
                                    className="review-title-textbox"
                                    type="file"
                                    onChange={fileSelectedHandler}
                            />
                        </div>}
                            
                            {/* {imageUrlIsShowing === 'url' || imageUrlIsShowing === 'image' &&  */}
                            <button onClick={submitForm} className="submit-review-button" type="button">Submit Dracula</button>
                            {/* } */}
                        </div>
                    </div>

                </div>
            </div>
      </div>
  );
}

export default AddDraculaModal;
