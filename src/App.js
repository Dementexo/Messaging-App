import msgUpdate from "./firebase.js";
import { useState } from 'react';

function App() {
  const { clientMessage, updateMessage } = useState('');
  return (
  <div className='App'>
    <div className='siteContainer'>
      <nav>MessageWebApp</nav>
      <div className='messageContainer'>
        <div className='messageBox'>
          msgbox
        </div>
      </div>
      <div className='chatAndTools'>
        <div className="chatBox">
          <input className="chatInput" placeholder="Click enter to send" type={ 'text' } onChange={e => {updateMessage(e)}}></input>
          <input className="enterButton" type={'button'} onClick={() => { msgUpdate(clientMessage)}}></input>
        </div>
      </div>
    </div>
  </div> 
  );   
}

export default App;
