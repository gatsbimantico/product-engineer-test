import React from 'react';

import SocketProvider, { SocketContext } from './contexts/SocketProvider'

import CypheredInput from './components/CypheredInput'
import CypheredMessage from './components/CypheredMessage'

import './App.css';

function App() {
  return (
    <SocketProvider>
      <div className="app">
        <p className="share-message">Share this url with your colleagues to start chatting: {window.location.origin}</p>
        <SocketContext.Consumer>
          {(context) => (
            <main className="message-list">
              {context.messages.sort((a, b) => b.time - a.time).map((message, i) => (
                <CypheredMessage key={`${message.time}${message.text}`} message={message} />
              ))}
              <CypheredInput onSubmit={context.emit} />
            </main>
          )}
        </SocketContext.Consumer>
      </div>
    </SocketProvider>
  );
}

export default App;
