
import React, { useEffect, useState } from 'react'
import { useLocation } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
// import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";
// import _ from "lodash";
import useCollapse from 'react-collapsed';
import AddReviewModal from './AddReviewModal'
import AverageRating from './AverageRating'


 /* eslint-disable */ 

function Detail() {
    const location = useLocation()
    const { thisDraculaId } = location.state
    
    const [thisDracula, setThisDracula] = useState({name: '', image_url: ''})
    const [thisDracsReviews, setThisDracsReviews] = useState([]);
    const [isExpanded, setExpanded] = useState(true);
    const [clickedDivIsExpanded, setClickedDivIsExpanded] = useState(false)
    const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded, setExpanded });
    const [starAverage, setStarAverage] = useState(null)

    useEffect(() => {

        setExpanded(false)

        const fetchAllDraculas = async () => {
            try{
                const response = await fetch(`http://localhost:3000/api/v1/draculas`);
                const draculas = await response.json();
                let thisDrac = await draculas.filter((drac) => drac.id === thisDraculaId)
                setThisDracula(thisDrac)
            } catch (error) {
                console.log(error)
            }
          };
          fetchAllDraculas();

        const fetchAllReviews = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/v1/reviews`);
                const reviews = await response.json();
                let dracReviews = await reviews.filter((rev) => rev.dracula_id === thisDraculaId)
                setThisDracsReviews([...dracReviews])
                console.log("ALL REVIEWS", thisDracsReviews)
            } catch (error) {
                console.log(error)
            }

        }
        fetchAllReviews()
    }, [starAverage]);

    const getAverageRating = async () => {
        thisDracsReviews.map((rev) => {
            console.log("SOCRE",rev.score)
        })
        const total = await thisDracsReviews.reduce((total, obj) => obj.score + total,0)
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

    const openReview = (divId) => {
        let id = thisDracsReviews.filter(rev => rev.id === divId)
        let cardId = document.getElementById("card")
        // console.log("card id", cardId)
        for (const rev of thisDracsReviews) {
            // console.log("rev.id", rev.id )
            // console.log("divId", divId)
            if(rev.id === divId){
                // console.log("MATCH")
                setExpanded((prevExpanded) => !prevExpanded)
       
            }
        }
    }


    const [isModalShowing, setIsModalShowing] = useState(false)

    const toggleModal = () => {
        setIsModalShowing((prevExpanded) => !prevExpanded)
    } 

    const deleteDracula = () => {
        console.log("delete")
    }


  return (
      <div>
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
                        <div className="plus-wrapper" onClick={() => deleteDracula()}>
                            <FontAwesomeIcon className="trash" size='1x' icon={faTrashAlt} />
                        </div>
                    </div>
                </div>
                {thisDracsReviews.length > 0 ? thisDracsReviews.map( rev =>
                    <div id="card" className="dracula-review-card" key={rev.id}>
                        <hr/>
                        <div className="review-top"
                            {...getToggleProps({
                                onClick: () => openReview(rev.id),
                                })}
                        > 
                            <h3>{ rev.title }</h3>
                            <FontAwesomeIcon className="chevron" size='1x' icon={faChevronLeft} />
                        </div>
                        {<section className="review-bottom" {...getCollapseProps()}>   
                            <AverageRating rating={rev.score} size={'1x'}/>
                            {/* <p><strong>Score: {rev.score}</strong></p> */}
                            <p>{rev.description}</p>
                        </section>}
                    </div>
                ) : <div><hr/><div style={{textAlign: "center"}}className="review-top">No one has reviewed this Dracula</div></div>}
                


        </div>
        {isModalShowing &&<AddReviewModal toggleModal={toggleModal} thisDraculaId={thisDraculaId}/>}
      </div>
  );
}

export default Detail;
