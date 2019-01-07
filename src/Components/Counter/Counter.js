import React, { Fragment } from 'react';

// Import librairie prop-types
import PropTypes from 'prop-types'

// Import feuille de style
import './Counter.css';

const Counter = ({ counter }) => (
    <Fragment>
        <span className="number">{ counter }</span>
        <span className="try">TRY</span>
    </Fragment>
)

Counter.propTypes = {
    counter: PropTypes.number.isRequired
  }

export default Counter;