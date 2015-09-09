import fetch from 'isomorphic-fetch';

export const REQUEST_ACCOUNTS = 'REQUEST_ACCOUNTS';
export const RECEIVE_ACCOUNTS = 'RECEIVE_ACCOUNTS';
export const FETCH_ACCOUNTS = 'FETCH_ACCOUNTS';

export const SELECT_ACCOUNT = 'SELECT_ACCOUNT';
export const INVALIDATE_ACCOUNT = 'INVALIDATE_ACCOUNT';
export const REQUEST_MESSAGES = 'RECEIVE_MESSAGES';
export const RECEIVE_MESSAGES = 'RECEIVE_MESSAGES';
export const FETCH_MESSAGES = 'FETCH_MESSAGES';

function requestAccounts() {
  return {
    type: REQUEST_ACCOUNTS
  };
}

function receiveAccounts(json) {
  console.log(json);
  return {
    type: RECEIVE_ACCOUNTS,
    accounts: json.data.accounts
  };
}

function fetchAccounts() {
  console.log('fetchAccounts');
  return dispatch => {
    dispatch(requestAccounts());
    return fetch('http://localhost:4567/api/accounts')
      .then(response => response.json())
      .then(json => dispatch(receiveAccounts(json)));
  };
}

function shouldFetchAccounts(state) {
  const accounts = state.accounts;
  if (!accounts) {
    return true;
  }
  if (accounts.isFetching) {
    return false;
  }
  return true;
}

export function fetchAccountsIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchAccounts(getState())) {
      return dispatch(fetchAccounts())
    }
  };
}

export function selectAccount(account) {
  return {
    type: SELECT_ACCOUNT,
    account
  };
}

export function invalidateAccount(account) {
  return {
    type: INVALIDATE_ACCOUNT,
    account
  };
}

function requestMessages(account) {
  return {
    type: REQUEST_MESSAGES,
    account
  };
}

function receiveMessages(account, json) {
  console.log(json);
  return {
    type: RECEIVE_MESSAGES,
    account: json.data.account,
    messages: json.data.messages
  };
}

function fetchMessages(account) {
  console.log('fetchMessages: ' + account);
  return dispatch => {
    dispatch(requestMessages());
    return fetch('http://localhost:4567/api/accounts/' + account + '/messages')
      .then(response => response.json())
      .then(json => dispatch(receiveMessages(account, json)));
  };
}

function shouldFetchMessages(state, account) {
  const messages = state.messages;
  if (!messages) {
    return true;
  }
  if (messages.isFetching) {
    return false;
  }
  return true;
}

export function fetchMessagesIfNeeded(account) {
  return (dispatch, getState) => {
    if (shouldFetchMessages(getState(), account)) {
      return dispatch(fetchMessages(account))
    }
  };
}
