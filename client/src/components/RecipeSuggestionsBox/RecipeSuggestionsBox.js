import React, { useState } from 'react';
import './RecipeSuggestionsBox.scss';
import PropTypes from 'prop-types'


const RecipeSuggestionsBox = ({ recipe, onSelection }) => {

    const [showModal, setShowModal] = useState(false);



    const onImageClick = (e) => {
        setShowModal(true);
    };

    const closeModal = (e) => {
        setShowModal(false);
    };

    if (showModal) {
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
        
        return (
            <div id="modal" style={customStyles}>
                <img src={recipe.image} alt={recipe.title} onClick={closeModal} id="modal-img" />
            </div>
        );
    }
    else return (
        <div id="suggestions-box">
            <h2 id="suggestions-box-title">{recipe.title}</h2>
            <img src={recipe.image} alt={recipe.title} onClick={onImageClick} id="suggestions-box-img" />
            <div id="suggestions-box-selections">
                <div className="suggestions-box-icon" id="suggestions-box-icon-dislike" onClick={onSelection}>
                    <i className="fas fa-times"></i>
                </div>
                <div className="suggestions-box-icon" id="suggestions-box-icon-like" onClick={onSelection}>
                    <i className="fas fa-utensils"></i>
                </div>
            </div>
        </div>
    );
}

RecipeSuggestionsBox.propTypes = {
    recipe: PropTypes.object.isRequired,
    onSelection: PropTypes.func.isRequired
};

export default RecipeSuggestionsBox;