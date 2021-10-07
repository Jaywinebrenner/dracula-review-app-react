
import React, { useEffect, useState} from 'react'
import useCollapse from 'react-collapsed';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import AverageRating from './AverageRating'


function Review({rev}) {

  const [isExpanded, setExpanded] = useState(false);
  const { getCollapseProps } = useCollapse({ isExpanded, setExpanded });

  const openReview = () => {
    setExpanded((prevExpanded) => !prevExpanded)
  }

  console.log("is explanded", isExpanded)
  return (
      <div id="card" className="dracula-review-card" key={rev.id}>
          <hr/>
          <div className="review-top"
              onClick={() => openReview(rev.id)}
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
  );
}

export default Review;
