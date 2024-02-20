
import React, { useEffect, useState } from 'react'
import Review from './Review'
import { useLocation } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'

import { Link } from "react-router-dom";
import AddReviewModal from './AddReviewModal'
import AverageRating from './AverageRating'
import firebase from "./firebase"


 /* eslint-disable */ 

function Detail() {
    const location = useLocation()
    const { thisDraculaId } = location.state && location.state

    
    const [thisDracula, setThisDracula] = useState({name: '', image_url: ''})
    const [thisDracsReviews, setThisDracsReviews] = useState([]);
    const [starAverage, setStarAverage] = useState(null);

    const draculasRef = firebase.firestore().collection("draculas")
    const reviewsRef = firebase.firestore().collection("reviews")

    useEffect(() => {

        const getDraculas = async () => {
            draculasRef.onSnapshot(snap => {
                const draculas = snap.docs.map(doc => doc.data())
                let thisDrac = draculas.filter((drac) => drac.id === thisDraculaId)
                setThisDracula(thisDrac)
            });
        }
        getDraculas();

        const getReviews = () => {
            reviewsRef.onSnapshot(snap => {
                const reviews = snap.docs.map(doc => doc.data())
                let dracReviews = reviews.filter((rev) => rev.dracula_id === thisDraculaId)
                setThisDracsReviews([...dracReviews])

            });
        }

        getReviews();
    }, [starAverage]);

    const getAverageRating = async () => {
        thisDracsReviews.map((rev) => {
        })
        const total = await thisDracsReviews.reduce((total, obj) => parseInt(obj.score) + total,0)
        const length = thisDracsReviews.length
        const average = Math.round(total / length)
        setStarAverage(average)
    }
    thisDracsReviews && getAverageRating()

    
    const renderDracula = () => {
        return (
            <div className="detail-header">
                <img className="dracula-detail-image" src={thisDracula ? thisDracula[0].image_url : ''}/>
                <h2>{thisDracula[0].name}</h2>
                {starAverage ? <AverageRating count={5} rating={starAverage} size={"3x"}/> : <div>No Rating Yet</div>}
            </div>
        )
    }


    const [isModalShowing, setIsModalShowing] = useState(false)

    const toggleModal = () => {
        setIsModalShowing((prevExpanded) => !prevExpanded)
    } 

    const deleteDracula = () => {
        // console.log("delete")
    }


  return (
      <div className="detail-page">
        <Link className="arrow-link" to={{ pathname: `/` }}>
            <FontAwesomeIcon className="arrow" size='3x' icon={faArrowLeft} />
        </Link>
        <div className="detail">

            {thisDracula.length && renderDracula()}
            <hr/>
                <div className="review-subheader">
                    <h3>Dracula Reviews</h3>
                    <div className="add-wrapper">
                        <p>Add Review</p>
                        <div className="plus-wrapper" onClick={() => toggleModal()}>
                            <FontAwesomeIcon className="plus" size='3x' icon={faPlusCircle} />
                        </div>
  
                    </div>
                </div>
                {thisDracsReviews.length > 0 ? thisDracsReviews.map( rev =>
                    <Review 
                    key={rev.id}
                    rev={rev} 
                />
                ) : <div><hr/><div style={{textAlign: "center"}}className="review-top">No one has reviewed this Dracula</div></div>}
                


        </div>
        {isModalShowing &&<AddReviewModal 
            toggleModal={toggleModal} 
            thisDraculaId={thisDraculaId} 
            thisDracula={thisDracula}
            starAverage={starAverage}
            size={"x3"}
        />}
      </div>
  );
}

export default Detail;
