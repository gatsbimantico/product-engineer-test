import React from 'react';

export const SocketContext = React.createContext();

export const userId = Math.floor(Math.random() * 1e8);

export const messageSignature = msg => `${msg.time}${msg.userId}`;

class SocketProvider extends React.Component {
  constructor() {
    super();

    this.state = {
      emit: () => {},
      messages: [{
        text: '10 15 9 14 5 4 28 20 8 5 28 18 15 15 13',
        time: new Date().getTime(),
        userId: userId,
      }],
      mounted: true,
      userId,
    };
  }

  componentDidMount() {
    if (typeof window === 'undefined' || typeof window.io !== 'function') return;

    const socket = window.io();

    this.setState({
      emit: (msg) => socket.emit('CHAT_MESSAGE', { message: msg, userId }),
    });

    socket.on('USER_CONNECTED', () => {
      const { messages, mounted } = this.state;

      if (mounted) {
        socket.emit('SHARE_MESSAGE_HISTORY', { messages });

        this.setState({
          messages: [
            ...messages,
            {
              text: '1 14 28 21 19 5 18 28 10 15 9 14 5 4 28 20 8 5 28 18 15 15 13',
              time: new Date().getTime(),
            },
          ]
        });
      }
    });

    socket.on('CHAT_MESSAGE', (data) => {
      const { messages, mounted } = this.state;

      if (mounted) {
        this.setState({
          messages: [
            ...messages,
            {
              text: data.message,
              time: new Date().getTime(),
              userId: data.userId,
            },
          ]
        });
      }
    });

    socket.on('USER_DISCONNECTED', () => {
      const { messages, mounted } = this.state;

      if (mounted) {
        this.setState({
          messages: [
            ...messages,
            {
              text: '1 14 28 21 19 5 18 28 4 9 19 3 15 14 14 5 3 20 5 4',
              time: new Date().getTime(),
            },
          ]
        });
      }
    });

    socket.on('MESSAGE_HISTORY', (data) => {
      const { messages, mounted } = this.state;

      const signatures = messages.map(messageSignature);

      if (mounted) {
        this.setState({
          messages: [
            ...messages,
            ...data.messages.filter(message => signatures.indexOf(messageSignature(message)) === -1)
          ]
        });
      }
    });
  }

  componentWillUnmount() {
    this.setState({ mounted: false });
  }

  render() {
    const { children } = this.props;

    return (
      <SocketContext.Provider value={this.state}>
        {children}
      </SocketContext.Provider>
    );
  }
}

export default SocketProvider;