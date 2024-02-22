import React, { useEffect, useState, useContext } from 'react';
import useCollapse from 'react-collapsed';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import AverageRating from './AverageRating';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';


import { ModalContext } from '../contexts/ModalContext.js';

function Review({ rev, isCurrentUsersReview }) {

    const { 
        editReviewIsOpen,
        handleEditReviewOpen,
        setClickedReviewToEdit,
        handleAreYouSureDeleteReviewOpen,
        areYouSureDeleteReviewOpen,
    } = useContext(ModalContext);



    const [isExpanded, setExpanded] = useState(true);
    const { getCollapseProps } = useCollapse({ isExpanded, setExpanded });

    const openReview = () => {
        setExpanded(prevExpanded => !prevExpanded);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const deleteReview = () => {
        console.log("DELTE CLICK")
    }

    return (
        <div id="card" className="dracula-review-card" key={rev.id}>
            <hr />
            <div
                className="review-top"
                onClick={() => openReview(rev.id)}
            >
                <h3>{rev.title}</h3>
                <FontAwesomeIcon
                    className={`chevron ${isExpanded ? 'expanded' : ''}`}
                    size="1x"
                    icon={faChevronLeft}
                />
            </div>
            {
                <section className="review-bottom" {...getCollapseProps()}>
                    <div style={{pointerEvents: "none"}}>
                    <AverageRating rating={rev.score} size={'1x'} />
                    </div>
                    {/* <p><strong>Score: {rev.score}</strong></p> */}
                    <p className="description">{rev.description}</p>
                    {rev.reviewerName ? (
                        <p className="reviewed-by">
                            Reviewed by:
                            <span style={{ fontWeight: '600' }}>{rev.reviewerName}</span>
                        </p>
                    ) : null}
                {isCurrentUsersReview && 
                <div className='edit-delete-review-icon-wrapper'>
                <div className='edit-wrapper'>
                    <img
                        onClick={() => {
                            handleEditReviewOpen();
                            setClickedReviewToEdit(rev);
                        }}
                        src="/edit.png"
                        />
                </div>

                <div className="delete-review-trash-wrapper" >
                    <FontAwesomeIcon 
                    onClick={() => {
                        setClickedReviewToEdit(rev);
                        handleAreYouSureDeleteReviewOpen();
                    }} 
                    className="drac-trash" 
                    size='1x' 
                    icon={faTrashAlt}
                    style={{ color: 'black' }}
                />
                </div>
                </div>
                }

            </section>
            }
        </div>
    );
}

export default Review;
