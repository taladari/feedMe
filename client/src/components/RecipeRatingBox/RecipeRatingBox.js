import React, { useEffect } from 'react';
import './RecipeRatingBox.css';
import { useState } from 'react';
import StarsRating from '../StarsRating/StartsRating';

const RecipeRatingBox = ({ recipe, onStarClick, ratedRecipes, currentRecipeIndex }) => {
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
    }, [recipe]);

    const onImageClick = (e) => {
        setShowModal(!showModal);
    };

    if(showModal){
        const customStyles = {
            content : {
              top                   : '50%',
              left                  : '50%',
              right                 : 'auto',
              bottom                : 'auto',
              marginRight           : '-50%',
              transform             : 'translate(-50%, -50%)'
            }
          };
          return(
            <div id="modal" style={customStyles}>
                <img src={recipe.image} alt={recipe.title} id="modal-img" onClick={onImageClick}/>
            </div>
          );
    }
    else return (
        <div id="recipe-rating-box">
            <h4 id="recipe-rating-box-title">{recipe.title}</h4>
            <img src={recipe.image} alt={recipe.title} id="recipe-rating-box-img" onClick={onImageClick}/>
            {/* Stars rate component */}
            <StarsRating onStarClick={onStarClick} recipe={recipe} ratedRecipes={ratedRecipes} currentRecipeIndex={currentRecipeIndex}/>
        </div>
    );
}

export default RecipeRatingBox;