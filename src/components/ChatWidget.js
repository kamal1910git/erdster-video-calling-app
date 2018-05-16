import React, { Component } from 'react';
import { Widget, addResponseMessage, addLinkSnippet, addUserMessage } from 'react-chat-widget';

import 'react-chat-widget/lib/styles.css';

import logo from './userIcon.png';

 class ChatWidget extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dateNow: new Date().toLocaleDateString()
        };
    }

  componentDidMount() {
    addResponseMessage("Note " + this.state.dateNow);
  }

  handleNewUserMessage = (newMessage) => {
    console.log(`New message incomig! ${newMessage}`);
    // Now send the message throught the backend API
  }

  render() {
    return (
      <div className="ChatWidget">
        <Widget
          handleNewUserMessage={this.handleNewUserMessage}
          title="Sticky Note"
          subtitle="My Note"
          senderPlaceHolder="Type your note"
        />
      </div>
    );
  } 
}

export default ChatWidget;