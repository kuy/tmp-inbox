import { combineReducers } from 'redux';
import { RECEIVE_ACCOUNTS, REQUEST_ACCOUNTS, SELECT_ACCOUNT,
         RECEIVE_MESSAGES, REQUEST_MESSAGES, INVALIDATE_ACCOUNT } from '../actions';

function selectedAccount(state = null, action) {
  switch (action.type) {
    case SELECT_ACCOUNT: 
      return action.account;
  }
  return state;
}

const initialAccounts = {
  items: [],
  isFetching: false
};

function accounts(state = initialAccounts, action) {
  switch (action.type) {
    case RECEIVE_ACCOUNTS:
      return Object.assign({}, state, {
        items: action.accounts,
        isFetching: false
      });
  }
  return state;
}

const initialMessages = {
  items: [],
  isFetching: false,
  didInvalidate: false
};

function messages(state = initialMessages, action) {
  switch (action.type) {
    case RECEIVE_MESSAGES:
      return Object.assign({}, state, {
        items: action.messages,
        isFetching: false,
        didInvalidate: false
      });
  }
  return state;
}

function messagesByAccount(state = {}, action) {
  switch (action.type) {
    case INVALIDATE_ACCOUNT:
    case RECEIVE_MESSAGES:
    case REQUEST_MESSAGES:
      return Object.assign({}, state, {
        [action.account]: messages(state[action.account], action)
      });
  }
  return state;
}

const rootReducer = combineReducers({
  accounts,
  selectedAccount,
  messagesByAccount
});

export default rootReducer;
