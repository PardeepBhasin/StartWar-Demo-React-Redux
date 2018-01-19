import React, { PropTypes } from 'react';
import './search.scss';

const Search = (props) => {
  const { value, onChange } = props;

  return (
    <div className="search">
      <div className="search__title">Search by</div>
      <div className="search__subtitle">Planets</div>
      <div className="search__input">
        <input
          type="text"
          placeholder="Enter a search term"
          onChange={e => onChange(e.target.value)}
          value={value}
          autoFocus
        />
      </div>
    </div>
  );
};

Search.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default Search;
