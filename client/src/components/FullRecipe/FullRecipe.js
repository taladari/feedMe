import React, {useState} from 'react'
import { Redirect } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types'
import './FullRecipe.scss';
import { rateRecipe } from '../../actions/profile';
import { connect } from 'react-redux';
import { FaArrowLeft } from 'react-icons/fa';

const FullRecipe = ({ recipe, rateRecipe, toggle }) => {
    const [inst, setInst] = useState(false);
    if (!recipe) return <Redirect to="/home" />
    const instructions = () => {
        if(inst){

            return (
                <ul className="recipe-box-section-list">
                {
                    recipe.instructions.map((instruct, index) => (
                        <li className="list-item" key={index}>
                            { instruct }
                        </li>
                    ))
                }
                </ul>
            );
        }
        else{
            return <hr/>
        }

    }
    return (
        <div
         className="recipe-box">
            <h3 className="recipe-box-title">{recipe.title}</h3>
            <div className="recipe-box-section" id="ingredients">
                <button className="backButton"><FaArrowLeft size="2em" onClick={toggle}/></button>
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
            <div
             className="recipe-box-section" id="instructions">
             <div className="instButton">
                <button 
                onClick={() => {
                    setInst(!inst)
                    console.log(recipe)
                    rateRecipe(recipe, 3)}} className="recipe-box-section-title">Instructions</button>
                    </div>
                <hr />
                {instructions()}
            </div>

        </div>

          
    );
}

FullRecipe.propTypes = {
    recipe: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    
});

export default withRouter(connect(mapStateToProps, { rateRecipe })(FullRecipe));