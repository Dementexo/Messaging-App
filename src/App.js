import React, { Component } from 'react';
import UiUpdate from './UIUpdate';

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
  msgSubmission = (e) => {
    e.preventDefault();
    this.setState({
      sentMessages: this.state.sentMessages.concat(this.state.ReceivedMessage),
      ReceivedMessage: { text: '' },
    });
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
            <div className='messageBox'>
              <UiUpdate sentMessages = {sentMessages}/>
            </div>
          </div>
          <div className='chatAndTools'>
           <div className='shortcutOptions'>
              <div className='deleteHistory'>
                <button className='dhButton'>
                  <img className='dhImg'src={require("./Images/history.png")} alt='Delete all history'></img>
                </button>
              </div>
            </div>
            <div className='chatBox'>
              <form className='inputForm' onSubmit={this.msgSubmission}>
                <input className='chatInput' placeholder="Click enter to send" type="text" value={ReceivedMessage.text} onChange={this.handleChange}></input>
                <button className='enterButton' type='submit'>Send</button>
              </form>
            </div>
          </div>
        </div>
      </div> 
    );  
  }
}

export default App;