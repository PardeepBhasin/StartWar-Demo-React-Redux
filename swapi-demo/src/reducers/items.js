import { combineReducers } from 'redux';
import { REQUEST_ITEMS, RECEIVE_ITEMS, UPDATE_SRC , FETCH_USER_SUCCESSS} from '../actions/items';

function searchStr(state = '', action) {
  switch (action.type) {
    case UPDATE_SRC:
      return action.searchStr;
    default:
      return state;
  }
}

function items(state = {
  isFetching: false,
  searchStr: '',
  items: [],
}, action) {
  switch (action.type) {
    case REQUEST_ITEMS:
      return Object.assign({}, state, {
        searchStr: action.searchStr,
        isFetching: true,
      });
    case RECEIVE_ITEMS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.items,
      });
    default:
      return state;
  }
}

function itemsBySearchString(state = {}, action) {
  switch (action.type) {
    case RECEIVE_ITEMS:
    case REQUEST_ITEMS:
      return Object.assign({}, state, {
        [action.searchStr]: items(state[action.searchStr], action),
      });
    default:
      return state;
  }
}

function userData(state = {}, action) {
  switch (action.type) {
    case FETCH_USER_SUCCESSS: 
      return action.data
    default:
      return state;
  }
}

export default combineReducers({
  itemsBySearchString,
  searchStr,
  userData
});
