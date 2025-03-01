import React from 'react';

import './CypheredInput.css';

const cypher = typeof window !== undefined && window.require && window.require('@pet/cypher');

const cleanEncodedMessage = str => str.replace(/\b0\b\s*/g, '').trim();

export default class CypheredInput extends React.PureComponent {
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

  onSubmit = (event) => {
    event.preventDefault();

    const { onSubmit } = this.props;
    const { message } = this.state;

    if (!message.trim()) return;

    const parsedMessage = message
      ? message.toUpperCase()
      : message;

    if (cypher) {
      const encodedMessage = cleanEncodedMessage(cypher.encode(parsedMessage));

      if (!encodedMessage) return;

      onSubmit(encodedMessage);
      this.setState({ message: '' });
    } else {
      fetch('/api/encode', {
        method: 'POST',
        headers: {
          'Accept': 'text/plain',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: parsedMessage })
      })
        .then(d => d.text())
        .then(text => {
          const encodedMessage = cleanEncodedMessage(text);

          if (!encodedMessage) return;

          onSubmit(encodedMessage);
          this.setState({ message: '' });
        });
    }
  }

  render() {
    const { message } = this.state;

    return (
      <form className="cyphered-input" onSubmit={this.onSubmit} action="#">
        <input className="cyphered-input__field" value={message || ''} onChange={this.onChange} />
        <button className="cyphered-input__cta" type="submit">Send</button>
      </form>
    );
  }
}
