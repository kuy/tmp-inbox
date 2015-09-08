import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import AccountList from '../components/AccountList';

const actions = {
  loadAccounts: function () { return { type: 'LOAD_ACCOUNTS' }; },
  selectAccount: function (account) { return { type: 'SELECT_ACCOUNT', account }; }
};

class App extends Component {
  render() {
    const { accounts, selectedAccount } = this.props;
    return (
      <AccountList accounts={accounts} selectedAccount={selectedAccount} onSelect={actions.selectAccount} />
    );
  }
}

App.propTypes = {
  accounts: PropTypes.object.isRequired,
  selectedAccount: PropTypes.string
};

function mapStateToProps(state) {
  return {
    accounts: state.accounts,
    selectedAccount: state.selectedAccount
  };
}

export default connect(mapStateToProps)(App);
