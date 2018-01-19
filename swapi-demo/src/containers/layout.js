import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchItemsIfNeeded } from '../actions/items';
import Search from '../components/Search';
import Results from '../components/Results';
import Loader from '../components/Loader';
import Logo from '../components/Logo';

import './layout.scss';

class StarwarDashboardComponent extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentWillMount() {
      if (!sessionStorage.getItem('userDetail')) {
        this.props.history.push('/login');
      }
  }

  componentDidMount() {
    const { dispatch, searchStr } = this.props;
    dispatch(fetchItemsIfNeeded(searchStr));
  }

  handleChange(searchStr) {
    this.props.dispatch(fetchItemsIfNeeded(searchStr));
  }

  logout() {
    sessionStorage.removeItem('userDetail');
    this.props.history.push('/login');
  }

  render() {
    const { searchStr, items, isFetching } = this.props;
    return (
      <div className="container">
        <header className="header">
          <Logo />
          <Search value={searchStr} onChange={this.handleChange} />
        </header>
        <section className="content">
          <button onClick={this.logout} className="btn btn-success">Logout</button>
          {isFetching && items.length === 0 &&
            <Loader />
          }
          {!isFetching && items.length === 0 &&
            <h2>No Results</h2>
          }
          {items.length > 0 &&
            <Results items={items} />
          }
        </section>
      </div>
    );
}
}

StarwarDashboardComponent.propTypes = {
  searchStr: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.object),
  isFetching: PropTypes.bool,
  dispatch: PropTypes.func,
};

function mapStateToProps(state) {
  const { searchStr, itemsBySearchString } = state;
  const { isFetching, items } = itemsBySearchString[searchStr] || {
    searchStr,
    isFetching: true,
    items: [],
  };

  return {
    searchStr,
    items,
    isFetching,
  };
}

export default connect(mapStateToProps)(StarwarDashboardComponent);
