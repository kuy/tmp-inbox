import React, { Component, PropTypes } from 'react';
import { Card, CardHeader, CardText, Avatar, Styles } from 'material-ui';

export default class MessageList extends Component {
  getChildContext() {
    return {
      muiTheme: (new Styles.ThemeManager())
    };
  }

  render() {
    const { messages } = this.props;

    return (
      <div className="message-list pure-u-4-5">
        {
          messages.map(message =>
            <Card initiallyExpanded={true}>
              <CardHeader
                title="Message"
                avatar={<Avatar style={{color:'red'}}>A</Avatar>}
                showExpandableButton={true}>
              </CardHeader>
              <CardText>
                <pre>{message}</pre>
              </CardText>
            </Card>
          )
        }
      </div>
    );
  }
}

MessageList.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.string).isRequired
};

MessageList.childContextTypes = {
  muiTheme: PropTypes.object
};
