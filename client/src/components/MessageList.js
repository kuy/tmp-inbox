import React, { Component, PropTypes } from 'react';

export default class MessageList extends Component {
  render() {
    const { messages } = this.props;

    return (
      <div className="message-list pure-u-4-5">
        {
          messages.map(message =>
            <pre>{message}</pre>)
        }
      </div>
    );
  }
}

MessageList.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.string).isRequired
};
