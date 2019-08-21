import React from 'react';

import SocketProvider, { SocketContext, messageSignature } from './contexts/SocketProvider'

import CypheredInput from './components/CypheredInput'
import CypheredMessage from './components/CypheredMessage'

import './App.css';

class App extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      'system.message.hidden': false,
    };
  }

  settingsChange = (event) => {
    this.setState({
      [event.target.name]: event.target.checked,
    });
  }

  render() {
    const {
      'system.message.hidden': systemMessageHidden,
    } = this.state;

    return (
      <SocketProvider>
        <div className="app">
          <p className="share-message">Share this url with your colleagues to start chatting: {window.location.origin}</p>
          <div className="settings">
            <div className="settings__group">
              <input name="system.message.hidden" id="system.message.hidden" type="checkbox" onChange={this.settingsChange} />
              <label htmlFor="system.message.hidden"> Hide system messages</label>
            </div>
          </div>
          <SocketContext.Consumer>
            {(context) => (
              <main className="message-list">
                {context.messages
                  .sort((a, b) => b.time - a.time)
                  .filter(a => (!systemMessageHidden || !!a.userId))
                  .map((message, i) => (
                    <CypheredMessage key={messageSignature(message)} message={message} />
                  ))}
                <CypheredInput onSubmit={context.emit} />
              </main>
            )}
          </SocketContext.Consumer>
        </div>
      </SocketProvider>
    );
  }
}

export default App;
