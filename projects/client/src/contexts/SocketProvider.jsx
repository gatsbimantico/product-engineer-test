import React from 'react';

export const SocketContext = React.createContext();

class SocketProvider extends React.Component {
  constructor() {
    super();

    this.state = {
      emit: () => {},
      messages: [],
      mounted: true,
    };
  }

  componentDidMount() {
    const socket = window.io();

    this.setState({
      emit: (msg) => socket.emit('CHAT_MESSAGE', msg),
    });

    socket.on('USER_CONNECTED', (socket) => {
      const { messages, mounted } = this.state;

      if (mounted) {
        this.setState({
          messages: [
            ...messages,
            '1 28 21 19 5 18 28 10 15 9 14 5 4 28 20 8 5 28 18 15 15 13',
          ]
        });
      }
    });

    socket.on('CHAT_MESSAGE', (msg) => {
      const { messages, mounted } = this.state;

      if (mounted) {
        this.setState({
          messages: [
            ...messages,
            msg,
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
            '1 28 21 19 5 18 28 4 9 19 3 15 14 14 5 3 20 5 4',
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