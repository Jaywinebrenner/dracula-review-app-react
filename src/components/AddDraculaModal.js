
import React, { useState } from 'react'
import Rate from './Rate.js'
import firebase from "./firebase"
import { useAuth } from '../contexts/AuthContext';



 /* eslint-disable */ 

function AddDraculaModal({toggleAddDraculaModal}) {

    const { currentUser } = useAuth();
    const [name, setName] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [image, setImage] = useState(null)
    const [uploadedImageUrl, setUploadedImageUrl] = useState()
    const [imageUrlIsShowing, setImageUrlIsShowing] = useState('display')
    const draculasRef = firebase.firestore().collection("draculas")

    const toggleImageUpload = (input) => {
        setImageUrlIsShowing(input)
    }

    const fileSelectedHandler = (event) => {
        setImage(event.target.files[0])
 
    }

    const submitForm = async (event) => {
        event.preventDefault();

        console.log("name", name)
        console.log("image", image)

        if(!name){
            return alert("Add a dracula name!")
        }
        if(!image){
            return alert("Add a cool dracula pic!")
        }

        let file = image;
        console.log("file", file)
        if(image) {
            let storageRef = firebase.storage().ref('/dracula_image/' + file.name);
            await storageRef.put(file);
        }
       
        let dracUrl = await getImageUrl(file.name);
     
        console.log("drac url", dracUrl)
        const dracula = { 
            name: name, 
            image_url: dracUrl, 
            // dracula_image: image,
            userId: currentUser.uid
        }   
        console.log("drac object", dracula)

        // Add dracula, then add Firebase ID to the dracula document
        draculasRef.add(dracula)
        .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
            draculasRef.doc(docRef.id).update({
                id: docRef.id
            })
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
        setUploadedImageUrl(null);
        setName('')
        toggleAddDraculaModal();
    }

    const getImageUrl = async (img) => {
        let storageRef =  firebase.storage().ref();
        let imgRef =  storageRef.child('dracula_image/' + img);
    
      // Get the download URL
        await imgRef.getDownloadURL()
        .then((url) => {
          console.log("DOWNLOAD URL", url)
            let newUrl = url
        //   this.formData.userUploadedTreeImage = url;
        //   this.userUploadedImageState = url;
        //   return this.formData.userUploadedTreeImage ;
            setUploadedImageUrl(newUrl)
            return url;
         
        })
        .catch((error) => {
            console.log("Error", error)
         });
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
