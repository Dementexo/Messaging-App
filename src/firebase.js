import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const fbConfig = {
  apiKey: "AIzaSyDIvLGepnxCfFDo1pYb56Q01piEadEmXvY",
    authDomain: "messagingapp-ebf31.firebaseapp.com",
    projectId: "messagingapp-ebf31",
    storageBucket: "messagingapp-ebf31.appspot.com",
    messagingSenderId: "91502291868",
    appId: "1:91502291868:web:625e7aaa6e007d919cb659",
    measurementId: "G-532507XQS7"
};

const appInit = initializeApp(fbConfig);
export const db = getDatabase(appInit);