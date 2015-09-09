import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { selectAccount, fetchAccountsIfNeeded } from '../actions';
import AccountList from '../components/AccountList';
import MessageList from '../components/MessageList';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(fetchAccountsIfNeeded());
  }

  handleSelect(account) {
    this.props.dispatch(selectAccount(account));
  }

  render() {
    const { accounts, selectedAccount } = this.props;
    const { messages } = this.props;

    return (
      <div className="pure-g">
        <AccountList accounts={accounts} selectedAccount={selectedAccount} onSelect={this.handleSelect} />
        <MessageList messages={messages} />
      </div>
    );
  }
}

App.propTypes = {
  selectedAccount: PropTypes.string,
  accounts: PropTypes.arrayOf(PropTypes.string).isRequired,
  messages: PropTypes.arrayOf(PropTypes.string).isRequired,
  isFetching: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const {
    selectedAccount,
    accounts: accountsWithMeta,
    messagesByAccount
  } = state;
  const { items: accounts } = accountsWithMeta;
  const {
    isFetching,
    items: messages
  } = messagesByAccount[selectedAccount] || {
    isFetching: true,
    items: []
  };

  return {
    selectedAccount,
    accounts,
    messages,
    isFetching
  };
}

export default connect(mapStateToProps)(App);
