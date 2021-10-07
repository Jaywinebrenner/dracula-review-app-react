
import React, { useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

function Rate({count, rating, color, onRating}) {

    const [hoverRating, setHoverRating] = useState()
    const getColor = index => {
        if(hoverRating >= index) {
            return color.filled
        } else if(!hoverRating && rating >= index) {
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
                size='3x' 
                icon={faStar} 
                style={{ color: getColor(idx)}}
                onClick={() => onRating(idx)}
                onMouseEnter={() => setHoverRating(idx)}
                onMouseLeave={()=> setHoverRating(0) }
            />
        ))
    }, [count, rating, hoverRating])


  return <div>{starRating}</div>

}
Rate.prototype = {
    count: PropTypes.number,
    rating: PropTypes.number,
    onRateChange: PropTypes.func,
    color: {
        filled: PropTypes.string,
        unfilled: PropTypes.string
    }
}

Rate.defaultProps = {
    count: 5,
    rating: 0,
    color: {
        filled: 'maroon',
        unfilled: 'gray'
    }
}

export default Rate;
