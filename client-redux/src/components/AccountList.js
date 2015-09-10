import classnames from 'classnames';
import React, { Component, PropTypes } from 'react';

export default class AccountList extends Component {
  render() {
    const { onSelect } = this.props;
    const { accounts, selectedAccount } = this.props;

    return (
      <div className="pure-menu account-list pure-u-1-5">
        <span className="pure-menu-heading">Accounts</span>
        <ul className="pure-menu-list">
          {
            accounts.map(account =>
              <li className={classnames({
                'pure-menu-item': true,
                'selected': account === selectedAccount
              })} key={account}>
                <a href="#account" className="pure-menu-link" onClick={() => onSelect(account)}>{account}</a>
              </li>)
          }
        </ul>
      </div>
    );
  }
}

AccountList.propTypes = {
  selectedAccount: PropTypes.string,
  accounts: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSelect: PropTypes.func.isRequired
};
