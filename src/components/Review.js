
import React, { useEffect, useState} from 'react'
import axios from 'axios'
import { Link } from "react-router-dom";


function Review() {


  return (
    <div className="dracula-review-card" key={rev.id}>
        <hr/>
        <div className="review-top"
            {...getToggleProps({
                onClick: () => openReview(rev.id),
                })}
        > 
            <h3>{ rev.title }</h3>
                {isExpanded ? '' : ''}
        </div>
        <section {...getCollapseProps()}>   
            <p><strong>Score: {rev.score}</strong></p>
            <p>{rev.description}</p>
        </section>
    </div>
  );
}

export default Review;
