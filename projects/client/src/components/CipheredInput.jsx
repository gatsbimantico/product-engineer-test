import React from 'react';

const cipher = typeof window !== undefined && window.require && window.require('@pet/cipher');

export default class CipheredInput extends React.PureComponent {
  constructor() {
    super();

    let message;

    try {
      message = localStorage.getItem('USER_INPUT');
    } catch (e) {
      console.log('No local storage available');
    }

    this.state = { message };
  }

  onChange = (event) => {
    const message = event.target.value;

    this.setState({ message });

    try {
      localStorage.setItem('USER_INPUT', message);
    } catch(e) {
      console.log('No local storage available');
    }
  }

  onClick = () => {
    const { onSubmit } = this.props;
    const { message } = this.state;

    const parsedMessage = message
      ? message.toUpperCase()
      : message;
    const encodedMessage = cipher
      ? cipher.encode(parsedMessage)
      : parsedMessage;

    onSubmit(encodedMessage);
  }

  render() {
    const { message } = this.state;

    return (
      <div>
        <input value={message} onChange={this.onChange} />
        <button onClick={this.onClick}>Send</button>
      </div>
    );
  }
}
