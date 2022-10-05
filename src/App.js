import { db } from './firebase';
import { uid } from 'uid';
import { set, ref, remove } from 'firebase/database';
import { useState } from 'react';
import React from 'react';

function App() {
  const [currentMessage, updateMessage] = useState('');
  const changeHandler = (e)=>{
    updateMessage(e.target.value)
  }
  const dbPush = () => {
    const uuid = uid();
    set(ref(db, `/${uuid}`),{
      receivedMessage: currentMessage,
      UniqueIdentifier: uuid
    });
    updateMessage('');
  }
  const delHistory = () =>{
    remove(ref(db));
  }
  return (
  <div className='App'>
    <div className='siteContainer'>
      <nav>MessageWebApp</nav>
      <div className='messageContainer'>
        <div className='dashBoard'>
          dashboard
        </div>
        <div className='messageBox'>
          msgbox
        </div>
      </div>
      <div className='chatAndTools'>
        <div className='shortcutOptions'>
          <div className='deleteHistory'>
            <button className='dhButton' onClick={delHistory}>
              <img className='dhImg'src={require("./Images/history.png")} alt='Delete all history'></img>
            </button>
          </div>
        </div>
        <div className='chatBox'>
          <form className='inputForm'>
            <input className='chatInput' placeholder="Click enter to send" type={'text'} onChange={changeHandler}></input>
            <button className='enterButton'onClick={dbPush}>Send</button>
          </form>
        </div>
      </div>
    </div>
  </div> 
 );  
} 

export default App;
