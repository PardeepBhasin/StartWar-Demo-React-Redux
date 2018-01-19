import fetch from 'isomorphic-fetch';

export const REQUEST_ITEMS = 'REQUEST_ITEMS';
export const RECEIVE_ITEMS = 'RECEIVE_ITEMS';
export const UPDATE_SRC = 'UPDATE_SRC';
export const FETCH_USER_SUCCESSS = 'FETCH_USER_SUCCESSS'

function updateSrcString(searchStr) {
  return {
    type: UPDATE_SRC,
    searchStr,
  };
}

function requestItems(searchStr) {
  return {
    type: REQUEST_ITEMS,
    searchStr,
  };
}

function receiveItems(searchStr, items) {
  return {
    type: RECEIVE_ITEMS,
    searchStr,
    items,
    receivedAt: Date.now(),
  };
}

function fetchAllItems(searchStr) {
  const urls = [
    `https://swapi.co/api/people`
  ];
  return (dispatch) => {
    dispatch(updateSrcString(searchStr));
    dispatch(requestItems(searchStr));
    return Promise.all(urls.map(url =>
      fetch(url).then(resp => resp.json())
    ))
    .then((resp) => {
        return resp[0].results.map((item) => {
            return {
              type: 'planet',
              name: item.name,
              gravity: item.gravity,
              terrain: item.terrain,
              population: item.population,
            };
        })
    })
    .then(json => dispatch(receiveItems(searchStr, json)));
  };
}

export function fetchUsers(productOptionsValueId) {
  return function(dispatch) {
      return  fetch(`https://swapi.co/api/people`)
      .then((response) => response.json())
      .then(data => {
          console.log('option data', data);
          dispatch (fetchUserSuccess(data.results));
      });
  }
}

export function fetchUserSuccess(data) {
  return {type : 'FETCH_USER_SUCCESSS', data : data};
}

function fetchAllItems(searchStr) {
  const urls = [
    `https://swapi.co/api/planets/?search=${searchStr}`
  ];
  return (dispatch) => {
    dispatch(updateSrcString(searchStr));
    dispatch(requestItems(searchStr));
    return Promise.all(urls.map(url =>
      fetch(url).then(resp => resp.json())
    ))
    .then((resp) => {
        return resp[0].results.map((item) => {
            return {
              type: 'planet',
              name: item.name,
              gravity: item.gravity,
              terrain: item.terrain,
              population: item.population,
            };
        })
    })
    .then(json => dispatch(receiveItems(searchStr, json)));
  };
}

export function fetchItemsIfNeeded(searchStr) {
  return (dispatch, getState) => {
      return dispatch(fetchAllItems(searchStr));
  };
}
