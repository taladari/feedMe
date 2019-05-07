import React, { useEffect } from 'react';
import './RecipeRatingBox.css';

import StarsRating from '../StarsRating/StartsRating';

const RecipeRatingBox = ({ recipe, onStarClick }) => {

    useEffect(() => {
    }, [recipe]);

    return (
        <div id="recipe-rating-box">
            <h4 id="recipe-rating-box-title">{recipe.title}</h4>
            <img src={recipe.image} alt={recipe.title} id="recipe-rating-box-img" />
            {/* Stars rate component */}
            <StarsRating onStarClick={onStarClick} recipe={recipe}/>
        </div>
    );
}

export default RecipeRatingBox;