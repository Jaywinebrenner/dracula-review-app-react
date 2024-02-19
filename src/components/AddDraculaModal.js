
import React, { useState, useEffect } from 'react'
import firebase from "./firebase"
import { useAuth } from '../contexts/AuthContext';
import loadingGif from '../assets/loadingGif.gif'
<img src={loadingGif} alt="loading..." /> 
 /* eslint-disable */ 

function AddDraculaModal({toggleAddDraculaModal}) {

    const { currentUser } = useAuth();
    const [name, setName] = useState('');
    const [image, setImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false)

    const draculasRef = firebase.firestore().collection("draculas");

    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    const fileSelectedHandler = (event) => {
        setImage(event.target.files[0])
    }

    const submitForm = async (event) => {
        setIsLoading(true);
        event.preventDefault();

        if(!name){
            setIsLoading(false);
            return alert("Add a dracula name!")
        }
        if(!image){
            setIsLoading(false);
            return alert("Add a cool dracula pic!")
        }
        if (name.toLowerCase().indexOf("dracula") === -1 && name.toLowerCase().indexOf("draculas") === -1) {
            // console.log("DOES")
            alert('Sorry, your dracula name needs to contain the word "Dracula" or "Draculas". This is Dracula Review after all.')
            setIsLoading(false);
            return;
        }

        let file = image;
        // console.log("file", file)
        if(image) {
            let storageRef = firebase.storage().ref('/dracula_image/' + file.name);
            await storageRef.put(file);
        }
       
        let storageRef =  firebase.storage().ref();
        let imgRef =  storageRef.child('dracula_image/' + file.name);
    
      // Get the download URL
        let dracUrl = null;
        await imgRef.getDownloadURL()
        .then((url) => {
        //   console.log("DOWNLOAD URL", url)
            dracUrl = url
            return url;
        })
        .catch((error) => {
            // console.log("Error", error)
         });

        const dracula = { 
            name: name, 
            image_url: dracUrl, 
            userId: currentUser.uid,
            scores: 0
        }   

        // Add dracula, then add Firebase ID to the dracula document
        draculasRef.add(dracula)
        .then(function(docRef) {
            // console.log("Document written with ID: ", docRef.id);
            draculasRef.doc(docRef.id).update({
                id: docRef.id
            })
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
        setIsLoading(false);
        setName('')
        toggleAddDraculaModal();
    }

    const renderReviewRequirements = () => {
        return (
            <div className="add-drac-subheader">
                <h3>You need to review <span className="review-number">{currentUser && currentUser.photoURL} </span> Draculas in order to create a Dracula of your own</h3>
                <p>Just to ensure you are a real Dracula Lover</p>
            </div>
        )
    }
    

    return (
         <div className="modal-page">
            <div className="modal-wrapper">
                {!isLoading && <div className="modal-content">
                    <div className="modal-top">
                        <h1>Add a Dracula</h1>
                        <div onClick={() => toggleAddDraculaModal()} className="x">x</div>
                    </div>
                    {(currentUser.photoURL === "1" || currentUser.photoURL === "2" || currentUser.photoURL === "3")  && renderReviewRequirements()}
                   <div className="modal-body">
                      
                   <div className="form">
                        <p>Dracula Name</p>
                        <input
                        className="review-title-textbox"
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />

                        {<div>
                            <p>Image from Computer</p>
                                <input
                                    className="review-title-textbox"
                                    type="file"
                                    onChange={fileSelectedHandler}
                            />
                        </div>}
                            
                        {/* <button disabled={isLoading || ((currentUser.photoURL === "1" || currentUser.photoURL === "2" || currentUser.photoURL === "3"))} onClick={submitForm} className="submit-review-button" type="button">Submit Dracula</button> */}
                        <button onClick={submitForm} className="submit-review-button" type="button">Submit Dracula</button> 
                
                        </div>
                    </div>

                </div>}
                {isLoading &&<div className="modal-content"><img className="loading-gif" src={loadingGif} alt="loading..." /> </div>}
            </div>
      </div>
  );
}

export default AddDraculaModal;
