import React from 'react';

// Import librairie prop-types
import PropTypes from 'prop-types'

// Import feuille de style
import './KeyBoard.css';

const KeyBoard = ({ letter, feedback, onClick }) => ( 
    <button 
        className={ `letter ${feedback}` } 
        onClick={ () => onClick(letter) }
    >
        { letter }
    </button>
)

KeyBoard.propTypes = {
    letter: PropTypes.string.isRequired,
    feedback: PropTypes.oneOf([
        'is-clicked',
        'is-not--clicked'
    ]).isRequired,
}

export default KeyBoard;