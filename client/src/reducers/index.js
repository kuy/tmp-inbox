import { combineReducers } from 'redux';

const initialSelectedAccount = null;

function selectedAccount(state = initialSelectedAccount, action) {
  switch (action.type) {
    case 'SELECT_ACCOUNT': 
      return action.account;
  }

  return state;
}

const initialAccounts = {
  isFetching: false,
  didInvalidate: false,
  items: []
};

function accounts(state = initialAccounts, action) {
  switch (action.type) {
    case 'REQUEST_ACCOUNTS':
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });
  }

  return state;
}

const rootReducer = combineReducers({
  accounts,
  selectedAccount
});

export default rootReducer;
