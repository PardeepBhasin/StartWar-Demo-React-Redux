import React, { PropTypes } from 'react';

import Planet from './planet.js';
import './results.scss';

const Results = props => (
  <ul className="results">
    {props.items.map((item, i) => {
      switch (item.type) {
        case 'planet':
          return <Planet key={i} item={item} />;
      }
    })}
  </ul>
);

Results.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Results;
