import React, { Component } from 'react';
import UiUpdate from './UIUpdate';
import "./firebase";
import { db } from './firebase';
import { uid } from 'uid';
import { signInWithGoogle, UnUpdate, AdminClear } from "./Auth";
import "firebase/compat/auth";
import firebase from "firebase/compat/app";
import { UserListGeneration } from "./social"

class App extends Component {
  constructor() {
    super();

    this.state = {
      ReceivedMessage: {text: ''},
      sentMessages: [],
      Username: "",
      PFP: "",
      Timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      Trigger: false,
      Trigger2: [],
      Notif: {}
    };
    
    firebase.auth().onAuthStateChanged((user) => {
      this.state.Username = user.displayName;
      this.state.PFP = user.photoURL;
      db.collection("Friends").doc(user.displayName).set({
        Email: user.email,
        ProfilePicture: user.photoURL,
        UniqueIdentifier: user.uid
      })
      this.setState({Trigger: true})
    });
    
    db.collection("Messages").onSnapshot((snapshot) => {
      this.setState({Trigger2: snapshot});
    })
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
      ReceivedMessage: { text: '' }
    });
    db.collection("Messages").doc(this.state.Username + "-" + uid()).set({
      Content: this.state.ReceivedMessage.text,
      SentBy: this.state.Username,
      ProfilePic: this.state.PFP,
      Timestamp: this.state.Timestamp
    }, { merge: true });
    new Audio(require("./Audio/mixkit-gaming-lock-2848 (online-audio-converter.com).mp3")).play();
  };
  deleteHistory = () => {
    this.setState({
      ReceivedMessage: {text: ''}, 
      sentMessages: []
    })
  };
  permDelete = () => {
    db.collection("Messages").doc().delete();
  };

  render() {
    const { ReceivedMessage } = this.state;

    return(
      <div className='App'>
        <div className='siteHeader'>
          <AdminClear/>
          <div className='headerTitle'>
            Created by Donathan Brown using
            <a className='firebaseLink' href='https://firebase.google.com/'> Firebase</a>
          </div>
          <a className='githubLink' href='https://github.com/Dementexo/Messaging-App'>
            <img className='ghImg' src={require("./Images/GitHub-Mark-Light-32px.png")} alt='GitHub'></img>
          </a>
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
                  <UserListGeneration/>
                </div>
              </div>
            </div>
            <div className='messageBox' ref={ this.gmContainerRef }>
              <div className='generatedMessageHolder'>
                <UiUpdate trigger = {this.state.Trigger2}/>
              </div>
            </div>
          </div>
          <div className='chatAndTools'>
           <div className='shortcutOptions'>
              <div className='deleteHistory'>
                <button className='dhButton' onClick={this.deleteHistory}>
                  <img className='dhImg'src={require("./Images/bin.png")} alt='Delete all history'></img>
                </button>
              </div>
              <div className='signIn'>
                <button className='siButton' onClick={signInWithGoogle} >
                  <img className='siImg' src={require("./Images/profile.png")} alt='Sign In'></img>
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