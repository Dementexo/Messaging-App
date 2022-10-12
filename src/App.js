import React, { Component } from 'react';
import UiUpdate from './UIUpdate';
import "./firebase";
import { db } from './firebase';
import { uid } from 'uid';

class App extends Component {
  constructor() {
    super();

    this.state = {
      ReceivedMessage: {text: ''},
      sentMessages: [],
    };
    this.gmContainerRef = React.createRef();
  }
  handleChange = (e) => {
    this.setState({
      ReceivedMessage: {
        text: e.target.value,
      }
    });
  };
  msgSubmission = async (e) => {
    e.preventDefault();
    this.setState({
      sentMessages: this.state.sentMessages.concat(this.state.ReceivedMessage),
      ReceivedMessage: { text: '' },
    });
    db.collection("Messages").doc(uid()).set({
      Content: this.state.ReceivedMessage.text
    }, { merge: true });
  };
  deleteHistory = () => {
    this.setState({
      ReceivedMessage: {text: ''}, 
      sentMessages: []
    })
  };
  render() {
    const { ReceivedMessage, sentMessages } = this.state;

    return(
      <div className='App'>
        <div className='siteContainer'>
          <nav>MessageWebApp</nav>
          <div className='messageContainer'>
            <div className='dashBoard'>
              dashboard
            </div>
            <div className='messageBox' ref={ this.gmContainerRef }>
              <UiUpdate sentMessages = {sentMessages}/>
            </div>
          </div>
          <div className='chatAndTools'>
           <div className='shortcutOptions'>
              <div className='deleteHistory'>
                <button className='dhButton' onClick={this.deleteHistory}>
                  <img className='dhImg'src={require("./Images/history.png")} alt='Delete all history'></img>
                </button>
              </div>
            </div>
            <div className='chatBox'>
              <form className='inputForm' onSubmit={this.msgSubmission}>
                <input className='chatInput' placeholder="Click enter to send" type="text" value={ReceivedMessage.text} onChange={this.handleChange}></input>
                <button className='enterButton' type='submit'>
                  <img className='sendImg' src={require("./Images/send-message.png")} alt='Send Message'></img>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div> 
    );  
  }
}

export default App;