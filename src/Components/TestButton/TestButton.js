import React from 'react';

import './TestButton.css';

const TestButton = ({ letter, feedback, onClick, stateButton }) => ( 
    <button 
        className={ `letter ${feedback}` } 
        onClick={ () => onClick(letter) }
    >
        { letter }
    </button>
)


export default TestButton;