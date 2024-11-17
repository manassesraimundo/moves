"use client";

import StarRatings from 'react-star-ratings';

type StarProps = {
    star_number: number
}

const Star = ({star_number}: StarProps) => {
    return (
        <StarRatings
            rating={star_number}
            starRatedColor="#ffd700"
            numberOfStars={10}
            name="rating"
            starDimension="20px"
            starSpacing="3px"
        />
    )
}

export default Star;