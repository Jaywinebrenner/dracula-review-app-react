
import React, { useState, useEffect } from 'react'
import firebase from "./firebase"
import { useAuth } from '../contexts/AuthContext';
import loadingGif from '../assets/loadingGif.gif'
<img src={loadingGif} alt="loading..." /> 
 /* eslint-disable */ 

function AreYouSure({toggleAreYouSure, deleteDracula, draculaToDelete}) {


    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    

    return (
         <div className="modal-page">
            <div className="modal-wrapper">
                <div className="modal-content">
                    <div className="modal-top">
                        <h1>Are You Sure you want to delete this Dracula?</h1>
                        <div onClick={() => toggleAreYouSure()} className="x">x</div>
                    </div>

                   <div className="are-you-sure-modal-body">
                       
                        <div onClick={() => deleteDracula(draculaToDelete)}className="yes-button"><h1 className="yes-text">YES</h1></div>
                        <div onClick={() => toggleAreYouSure()} className="no-button"><h1 className="yes-text">CANCEL</h1></div>
                    </div>

                </div>
                {isLoading &&<div className="modal-content"><img className="loading-gif" src={loadingGif} alt="loading..." /> </div>}
            </div>
      </div>
  );
}

export default AreYouSure;
