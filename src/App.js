import React, { Component } from 'react';
import { UiUpdate, ImgCredits }  from './UIUpdate';
import "./firebase";
import { db } from './firebase';
import { uid } from 'uid';
import { signInWithGoogle, UnUpdate, AdminClear } from "./Auth";
import "firebase/compat/auth";
import firebase from "firebase/compat/app";
import { UserListGeneration } from "./social";

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
      Trigger3: false,
      Notif: {},
    };
    
    firebase.auth().onAuthStateChanged((user) => {
      this.state.Username = user.displayName;
      this.state.PFP = user.photoURL;
      db.collection("Friends").doc(user.displayName).set({
        Email: user.email,
        ProfilePicture: user.photoURL,
        UniqueIdentifier: user.uid,
      })
      if (user.uid == "buTtOeXKF5Rx4BNZQ1FeKrvhfUC3"){
        db.collection("Friends").doc(user.displayName).update({
          isOwner: "Owner"
        })
      }
      else {
        db.collection("Friends").doc(user.displayName).update({
          isOwner: "User"
        })
      }
      this.setState({Trigger: true})
    });
    
   const unsub = () => db.collection("Messages").onSnapshot((snapshot) => {
      this.setState({Trigger2: snapshot});
      console.log("Success!");
      new Audio(require("./Audio/mixkit-gaming-lock-2848 (online-audio-converter.com).mp3")).play();
    })
    unsub();
    this.gmContainerRef = React.createRef();
  }
  /*This file was initally created to experiment with Class Components instead of Functional ones, thus
  why the functions below remain here. Functional components are imported.*/

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
    if(this.state.Username != ""){
      db.collection("Messages").doc(this.state.Username + "-" + uid()).set({
        Content: this.state.ReceivedMessage.text,
        SentBy: this.state.Username,
        ProfilePic: this.state.PFP,
        Timestamp: this.state.Timestamp
      }, { merge: true });
    }
    else {
      db.collection("Messages").doc(this.state.Username + "-" + uid()).set({
        Content: this.state.ReceivedMessage.text,
        SentBy: "Anonymous",
        ProfilePic: "https://img.freepik.com/free-vector/mysterious-gangster-character_23-2148483453.jpg?w=740&t=st=1668722409~exp=1668723009~hmac=61a7b575bea733e8ece62e06514232419ac20ce7e7b9d5c8b4dcdba9937c3d45",
        Timestamp: this.state.Timestamp
      }, { merge: true });
    }
  };
  permDelete = () => {
    db.collection("Messages").doc().delete();
  };
  displayCredits = () => {
    if(this.state.Trigger3 === false){
      this.setState({
        Trigger3: true
      })
    }
    else if (this.state.Trigger3 === true){

      this.setState({
        Trigger3: false,
        
      })
    }
  }

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
        <div className='photoCredHead'>
          <div className='photoCredHolder'>
            Don't forget to check out the artists behind these icons/photos!
          </div>
        </div>
        <div className='siteContainer'>
          <nav>
           <UnUpdate/>
          </nav>
          <div className='messageContainer'>
          <ImgCredits trigger = {this.state.Trigger3}/>
            <div className='searchDashBoard'>
              <div className='searchContainer'>
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
                <button className='dhButton' onClick={this.displayCredits}>
                  <img className='dhImg'src={require("./Images/face.png")} alt='Delete all history'></img>
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
        </div>
      </div> 
    );  
  }
}

export default App;