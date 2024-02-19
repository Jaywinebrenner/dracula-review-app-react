import React, { useEffect, useState } from 'react';
import useCollapse from 'react-collapsed';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import AverageRating from './AverageRating';

function Review({ rev }) {
    console.log("REV", rev)

    const [isExpanded, setExpanded] = useState(true);
    const { getCollapseProps } = useCollapse({ isExpanded, setExpanded });

    const openReview = () => {
        setExpanded(prevExpanded => !prevExpanded);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

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
                    <AverageRating rating={rev.score} size={'1x'} />
                    {/* <p><strong>Score: {rev.score}</strong></p> */}
                    <p className="description">{rev.description}</p>
                    {rev.reviewerName ? (
                        <p className="reviewed-by">
                            Reviewed by:
                            <span style={{ fontWeight: '600' }}>{rev.reviewerName}</span>
                        </p>
                    ) : null}
                </section>
            }
        </div>
    );
}

export default Review;
