import React, { Component, PropTypes } from 'react';
import { createStore, bindActionCreators } from 'redux';
import { Provider, connect } from 'react-redux';

$ = jQuery;

const initialState = {
  accounts: [],
  selectedAccount: null,
  messages: []
};

function tmpInboxApp(state = initialState, action) {
  switch (action.type) {
    case 'LOAD_ACCOUNTS':
      return state;
    case 'SELECT_ACCOUNT':
      console.log(action);
      return state;
  }
  return state;
}

let store = createStore(tmpInboxApp);

class AccountList extends Component {
  render() {
    const { accounts, selectAccount } = this.props;
    return (
      <div className="pure-menu account-list pure-u-1-5">
        <span className="pure-menu-heading">Accounts</span>
        <ul className="pure-menu-list">
          {
            accounts.map(account =>
              <li className="pure-menu-item" key={account}>
                <a href="#account" className="pure-menu-link" onClick={() => selectAccount(account)}>{account}</a>
              </li>)
          }
        </ul>
      </div>
    );
  }
}

class TmpInbox extends Component {
  render() {
    const { accounts, selectAccount } = this.props;
    return (
      <AccountList accounts={accounts} selectAccount={selectAccount} />
    );
  }
}

TmpInbox.propTypes = {
  loadAccounts: PropTypes.func.isRequired,
  selectAccount: PropTypes.func.isRequired
};

let actions = {
  loadAccounts: function () { return { type: 'LOAD_ACCOUNTS' }; },
  selectAccount: function (account) { return { type: 'SELECT_ACCOUNT', account }; }
};

function mapStateToProps(state) {
  return {
    accounts: state.accounts,
    selectedAccount: state.selectedAccount,
    messages: state.messages
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

let TmpInboxApp = connect(mapStateToProps, mapDispatchToProps)(TmpInbox);

$(document).ready(function() {
  React.render((
    <Provider store={store}>
      {() => <TmpInboxApp />}
    </Provider>
  ), document.getElementById('tmp-inbox-root'));
});
