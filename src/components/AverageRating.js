
import React, { useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

function AverageRating({count, rating, color, size, onRating}) {

    const getColor = index => {
        if(rating >= index) {
            return color.filled
        } else {
            return color.unfilled
        }
    }

    const starRating = useMemo(() => {
        return Array(count)
        .fill(0)
        .map((_, i) => i + 1)
        .map( idx => (

            <FontAwesomeIcon 
                key={idx}
                className="start" 
                size={size}
                icon={faStar} 
                style={{ color: getColor(idx)}}
            />
        ))
    }, [count, rating])


  return <div>{starRating}</div>

}
AverageRating.prototype = {
    count: PropTypes.number,
    rating: PropTypes.number,
    color: {
        filled: PropTypes.string,
        unfilled: PropTypes.string
    },
    size: PropTypes.string
}

AverageRating.defaultProps = {
    count: 5,
    rating: 0,
    color: {
        filled: 'maroon',
        unfilled: 'gray'
    }
}

export default AverageRating;
