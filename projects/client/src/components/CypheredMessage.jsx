import React from 'react';

import { userId } from '../contexts/SocketProvider';

import './CypheredMessage.css';

const cypher = typeof window !== undefined && window.require && window.require('@pet/cypher');

export default class CypheredMessage extends React.Component {
  constructor() {
    super();

    this.state = {
      message: {}
    };
  }

  componentDidMount() {
    const { message } = this.props;

    if (cypher) {
      this.setState({
        message: {
          ...message,
          text: cypher.decode(message.text),
        },
      });
    } else {
      fetch('/api/decode', {
        method: 'POST',
        headers: {
          'Accept': 'text/plain',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: message.text })
      })
        .then(d => d.text())
        .then(decodedMessage => this.setState({
          message: {
            ...message,
            text: decodedMessage,
          },
        }));
    }
  }
  render() {
    const { message } = this.state;

    return (
      <div
        className="cyphered-message"
        style={!message.userId
          ? {
            background: 'lightgrey',
            opacity: 0.5,
            margin: 0,
            fontSize: '0.8em',
          }
          : {}
        }
      >
        {!!message.time && (
          <div className="cyphered-message__time">
            {new Date(message.time).toLocaleTimeString()}
          </div>
        )}
        {!!message.userId && message.userId !== userId && (
          <div className="cyphered-message__user">
            {message.userId}
          </div>
        )}
        <div
          className="cyphered-message__text"
          style={{
            textAlign: message.userId && message.userId === userId
              ? 'right'
              : !message.userId
                ? 'center'
                : 'left',
          }}
        >
          {message.text}
        </div>
      </div>
    );
  }
}
