import React from 'react'
import { Redirect } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types'
import './FullRecipe.scss';

const FullRecipe = ({ recipe, history }) => {
    if (!recipe) return <Redirect to="/home" />

    return (
        <div className="recipe-box">
            <h3 className="recipe-box-title">{recipe.title}</h3>
            <div className="recipe-box-section" id="ingredients">
                <h4 className="recipe-box-section-title">Ingredients</h4>
                <hr />
                <ul className="recipe-box-section-list">
                {
                    recipe.ingredients.map((ingred, index) => (
                        <li className="list-item" key={index}>
                            <i className="fas fa-shopping-cart"></i>
                            { ingred }
                        </li>
                    ))
                }
                </ul>
            </div>
            <div className="recipe-box-section" id="instructions">
                <h4 className="recipe-box-section-title">Instructions</h4>
                <hr />
                <ul className="recipe-box-section-list">
                {
                    recipe.instructions.map((instruct, index) => (
                        <li className="list-item" key={index}>
                            { instruct }
                        </li>
                    ))
                }
                </ul>
            </div>
        </div>
    );
}

FullRecipe.propTypes = {
    recipe: PropTypes.object.isRequired
}

export default withRouter(FullRecipe);

