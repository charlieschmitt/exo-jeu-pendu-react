import React from 'react';

import './GuessMask.css';

const HIDDEN_SYMBOL = '_';

const GuessMask = ({ letterGuess, feedback }) => (
    <div className={ `mask ${feedback}` }>
        <span>{ feedback === 'hidden' ? HIDDEN_SYMBOL : letterGuess }</span>
    </div>
)

export default GuessMask;