import React from 'react';

import SocketProvider, { SocketContext } from './contexts/SocketProvider'

import CipheredInput from './components/CipheredInput'
import CipheredMessage from './components/CipheredMessage'

import './App.css';

function App() {
  return (
    <SocketProvider>
      <div className="App">
        <SocketContext.Consumer>
          {(context) => console.log(context) || (
            <main>
              {context.messages.map((message, i) => (
                <CipheredMessage key={i} message={message} />
              ))}
              <CipheredInput onSubmit={context.emit} />
            </main>
          )}
        </SocketContext.Consumer>
      </div>
    </SocketProvider>
  );
}

export default App;
