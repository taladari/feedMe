import React, { useState, useEffect } from 'react';
import './StarsRating.css';

const StarsRating = ({ onStarClick, recipe ,ratedRecipes, currentRecipeIndex}) => {
    const [colors, setColors] = useState(['#ddd', '#ddd', '#ddd']);
    useEffect(() => {
        if (ratedRecipes[currentRecipeIndex] != null){
            let clrs = [];
            let i = 0;
            while (i < ratedRecipes[currentRecipeIndex]) {
                clrs[i] = '#f0a000';
                i++;
            }   
            while (i < colors.length) {
                clrs[i] = '#ddd';
                i++;
            }
            setColors(clrs);
        }
        else {
            setColors(['#ddd', '#ddd', '#ddd']);
        }
    }, [recipe]);

    const onStarClickInternal = (e) => {
        const starNum = e.target.id.slice(-1);
        const index = parseInt(starNum);
        let i = 0;
        let clrs = [];
        while (i < index) {
            clrs[i] = '#f0a000';
            i++;
        }   
        while (i < colors.length) {
            clrs[i] = '#ddd';
            i++;
        }
        setColors(clrs);

        onStarClick((clrs.filter(c => c === '#f0a000').length));     
    };


    return (
        <div id="stars-rating-box">
            <i className="fas fa-star" key="star1" id="star1" style={{color: colors[0]}} onClick={onStarClickInternal}></i>
            <i className="fas fa-star" key="star2" id="star2" style={{color: colors[1]}} onClick={onStarClickInternal}></i>
            <i className="fas fa-star" key="star3" id="star3" style={{color: colors[2]}} onClick={onStarClickInternal}></i>
        </div>
    );
}

export default StarsRating;