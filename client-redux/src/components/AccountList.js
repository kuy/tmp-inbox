import classnames from 'classnames';
import React, { Component, PropTypes } from 'react';
import { List, ListItem, Styles } from 'material-ui';

export default class AccountList extends Component {
  getChildContext() {
    return {
      muiTheme: (new Styles.ThemeManager())
    };
  }

  render() {
    const { onSelect } = this.props;
    const { accounts, selectedAccount } = this.props;

    return (
      <div className="account-list pure-u-1-5">
        <List subheader="Accounts">
          {
            accounts.map(account =>
              <ListItem
                primaryText={account}
                onMouseUp={() => onSelect(account)} />
            )
          }
        </List>
      </div>
    );
  }
}

AccountList.propTypes = {
  selectedAccount: PropTypes.string,
  accounts: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSelect: PropTypes.func.isRequired
};

AccountList.childContextTypes = {
  muiTheme: PropTypes.object
};
