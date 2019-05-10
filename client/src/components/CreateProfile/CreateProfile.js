import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getRecipes } from '../../actions/recipes';
import { saveProfile } from '../../actions/profile';
import PropTypes from 'prop-types'
import Loading from '../Loading/Loading';
import isEmpty from '../../utils/isEmpty';
import './CreateProfile.css';

import RecipeRatingBox from '../RecipeRatingBox/RecipeRatingBox';
import { setAlert } from '../../actions/alert';

const CreateProfile = ({ getRecipes, saveProfile, setAlert, recipes, user, profile }) => {

    const [initialized, setInitialized]  = useState(false);
    const [currentRecipeIndex, setCurrentRecipeIndex] = useState(0);
    const [ratedRecipes, setRatedRecipes] = useState({});

    useEffect(() => {
        if (!initialized) {
            getRecipes(50);
            setInitialized(true);
        }
        if(currentRecipeIndex === recipes.length-1){
            getRecipes(recipes.length + 10);
            console.log("50 more added");
        }
    }, [currentRecipeIndex, ratedRecipes, recipes, getRecipes, initialized]);

    const onNextRecipe = (e) => {
        onArrowClick(1);
    };

    const onPrevRecipe = (e) => {
        onArrowClick(-1);
    };

    const onArrowClick = (direction) => {
        const threes = Object.keys(ratedRecipes).filter(key => parseInt(ratedRecipes[key]) === 3);
        if (threes && threes.length === 10) {
            const rated = threes.reduce((result, key) => {
                result[recipes[key]._id] = ratedRecipes[key];
                return result;
            }, {});
            saveProfile(user._id, rated);
        }
        else {
            setCurrentRecipeIndex(currentRecipeIndex + direction);            
        }
    };

    const onStarClick = (rating) => {
        setRatedRecipes({ ...ratedRecipes, [currentRecipeIndex]: rating });
    };

    if (profile.loaded && profile.result) {
        setAlert('Profile Created Successfuly', 'success');
        return <Redirect to="/home" />;
    }

    if (isEmpty(recipes)) return <Loading />;

    const dummyRecipe = {
        desc: '',
        title: '',
        image: ''
    };

    return (
        <div id="create-profile">
            <h3 id="create-profile-header">Rate The Recipes</h3>
            <div id="rating-box">
                <i className="fas fa-arrow-left" onClick={onPrevRecipe}></i>
                <RecipeRatingBox recipe={ recipes[currentRecipeIndex] || dummyRecipe } onStarClick={onStarClick} ratedRecipes={ratedRecipes} currentRecipeIndex={currentRecipeIndex}/>
                <i className="fas fa-arrow-right" onClick={onNextRecipe}></i>
            </div>
        </div>
    );
}
CreateProfile.propTypes = {
    getRecipes:   PropTypes.func.isRequired,
    saveProfile: PropTypes.func.isRequired,
    recipes: PropTypes.array,
    user: PropTypes.object,
    profile: PropTypes.object
};

const mapStateToProps = state => ({
    recipes: state.recipes,
    user: state.auth.user,
    profile: state.profile
});

export default connect(mapStateToProps, { getRecipes, saveProfile, setAlert })(CreateProfile);