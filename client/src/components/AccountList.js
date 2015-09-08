import React, { Component, PropTypes } from 'react';

export default class AccountList extends Component {
  render() {
    const { onSelect } = this.props;
    const { accounts, selectedAccount } = this.props;
    const { items } = accounts;

    return (
      <div className="pure-menu account-list pure-u-1-5">
        <span className="pure-menu-heading">Accounts</span>
        <ul className="pure-menu-list">
          {
            items.map(account =>
              <li className="pure-menu-item" key={account}>
                <a href="#account" className="pure-menu-link" onClick={() => onSelect(account)}>{account}</a>
              </li>)
          }
        </ul>
      </div>
    );
  }
}

AccountList.propTypes = {
  accounts: PropTypes.object.isRequired,
  selectedAccount: PropTypes.string,
  onSelect: PropTypes.func.isRequired
};
