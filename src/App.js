import React, { Component } from 'react';
import UiUpdate from './UIUpdate';
import "./firebase";
import { db } from './firebase';
import { uid } from 'uid';
import { signInWithGoogle, UnUpdate } from "./Auth";
import "firebase/compat/auth";
import firebase from "firebase/compat/app";


class App extends Component {
  constructor() {
    super();

    this.state = {
      ReceivedMessage: {text: ''},
      sentMessages: [],
      Username: ""
    };
    
    firebase.auth().onAuthStateChanged((user) => {
      this.state.Username = user.displayName;
      db.collection("Friends").doc(user.displayName).set({
        Email: user.email,
        Phone: user.phoneNumber,
        ProfilePicture: user.photoURL,
        UniqueIdentifier: user.uid
      })
    });
    
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
      Content: this.state.ReceivedMessage.text,
      SentBy: this.state.Username
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
        <div className='generalInfo'>
          <img className='giImg' src={require("./Images/information.png")}></img>
        </div>
        <div className='siteContainer'>
          <nav>
           <UnUpdate/>
          </nav>
          <div className='messageContainer'>
            <div className='searchDashBoard'>
              <div className='searchContainer'>
                <div className='searchBarContainer'>
                  <input type={'text'} className='searchInput'></input>
                </div>
                <div className='resultsContainer'>
                  In Development
                </div>
              </div>
            </div>
            <div className='messageBox' ref={ this.gmContainerRef }>
              <UiUpdate sentMessages = {sentMessages} userName = {this.state.Username}/>
            </div>
          </div>
          <div className='chatAndTools'>
           <div className='shortcutOptions'>
              <div className='deleteHistory'>
                <button className='dhButton' onClick={this.deleteHistory}>
                  <img className='dhImg'src={require("./Images/history.png")} alt='Delete all history'></img>
                </button>
              </div>
              <div className='signIn'>
                <button className='siButton' onClick={signInWithGoogle} >
                  <img className='siImg' src={require("./Images/user.png")} alt='Sign In'></img>
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
          <div className='loginInfo'>
            ~If not currently logged, click the green button~
        </div>
        </div>
      </div> 
    );  
  }
}

export default App;