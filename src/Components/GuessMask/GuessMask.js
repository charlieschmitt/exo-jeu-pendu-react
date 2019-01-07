import React from 'react';

// Import librairie prop-types
import PropTypes from 'prop-types'

// Import feuille de style
import './GuessMask.css';

const HIDDEN_SYMBOL = '_';

const GuessMask = ({ letterGuess, feedback }) => (
    <div className={ `mask ${feedback}` }>
        <span>{ feedback === 'hidden' ? HIDDEN_SYMBOL : letterGuess }</span>
    </div>
)

GuessMask.propTypes = {
    feedback: PropTypes.oneOf([
        'visible',
        'hidden'
    ]).isRequired,
}

export default GuessMask;