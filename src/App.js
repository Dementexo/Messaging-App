import firebase from 'firebase/app';
import 'firebase/database';

const fbConfig = {
  apiKey: "AIzaSyDIvLGepnxCfFDo1pYb56Q01piEadEmXvY",
    authDomain: "messagingapp-ebf31.firebaseapp.com",
    projectId: "messagingapp-ebf31",
    storageBucket: "messagingapp-ebf31.appspot.com",
    messagingSenderId: "91502291868",
    appId: "1:91502291868:web:625e7aaa6e007d919cb659",
    measurementId: "G-532507XQS7"
};

firebase.initializeApp(fbConfig);
const dbRef = firebase.database().ref();
const testRef = dbRef.child("Jan's Flower Shop");
const data = {
  NewCustomers: {
    Person1: 'Ligma',
    Person2: 'Sugma',
    Person3: 'ratioed'
  },
  SeasonedCustomers: {
    Person1: 'Bertha',
    Person2: 'Duke Nukem',
    Person3: 'Martha Stewart'
  }
}

testRef.set(data);

function App() {
  return (
  <div className='App'>
    <div className='siteContainer'>
      <nav>MessageBox</nav>
      <div className='messageBox'>
        msgboxd
      </div>
      <div className='chatAndTools'>
        <div className='chatBox'>
          chatbox
        </div>
      </div>
    </div>
  </div> 
  );   
}

export default App;
