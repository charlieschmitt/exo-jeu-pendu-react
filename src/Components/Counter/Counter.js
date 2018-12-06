import React, { Fragment } from 'react';

import './Counter.css';

const Counter = ({ counter }) => (
    <Fragment>
        <span className="number">{ counter }</span>
        <span className="try">TRY</span>
    </Fragment>
)

export default Counter;