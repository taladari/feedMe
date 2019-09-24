import React, { useState } from 'react';
import './RecipeSuggestions.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import RecipeSuggestionsBox from '../RecipeSuggestionsBox/RecipeSuggestionsBox';
import FullRecipe from '../FullRecipe/FullRecipe';
import CookingLoading from '../CookingLoading/CookingLoading';
import { getRecipeSuggestions } from '../../actions/suggestions';
import { rateRecipe } from '../../actions/profile';
import PropTypes from 'prop-types'
import { FaRegArrowAltCircleRight, FaRegArrowAltCircleLeft } from 'react-icons/fa';

const RecipeSuggestions = ({ suggestions: { recipes, loaded }, getRecipeSuggestions, rateRecipe }) => {

    const [recipeIndex, setRecipeIndex] = useState(0);
    const [showFullRecipe, setshowFullRecipe] = useState(false);

    const toggle = () => {
        setshowFullRecipe(!showFullRecipe);
    }

    const changeRecipe = dir => {
        if(recipeIndex + dir >= 0 ){
            setRecipeIndex(recipeIndex + dir);
        }
        
    }

    const onSelection = (e) => {
        e.preventDefault();
        if (e.currentTarget.id.endsWith('dislike')){ 
            setRecipeIndex(recipeIndex + 1);
            rateRecipe(recipes[recipeIndex], 1);
        }
        else{
            setshowFullRecipe(true);
            rateRecipe(recipes[recipeIndex], 2);
        } 
    };

    if (!loaded) {
        getRecipeSuggestions();
        return <CookingLoading />;
    } 

    if (showFullRecipe) return <FullRecipe toggle={toggle} recipe={recipes[recipeIndex]} />;

    return (
    <div>
        <div className="box">
        <button className="nextButton"><FaRegArrowAltCircleLeft size="4em" onClick={() => changeRecipe(-1)}/></button>
            <RecipeSuggestionsBox recipe={recipes[recipeIndex]} onSelection={onSelection} />
            <button className="nextButton"><FaRegArrowAltCircleRight size="4em" onClick={() => changeRecipe(1)}/></button>
        </div>
    
    <hr/>
    
    </div>
    );
}

RecipeSuggestions.propTypes = {
    getRecipeSuggestions: PropTypes.func.isRequired,
    recipes: PropTypes.object
};

const mapStateToProps = state => ({
    suggestions: state.suggestions
});

export default withRouter(connect(mapStateToProps, { getRecipeSuggestions, rateRecipe })(RecipeSuggestions));