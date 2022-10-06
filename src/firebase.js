import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
const fbConfig = {
    apiKey: process.env.REACT_APP_A_KEY,
    authDomain: process.env.REACT_APP_AD_KEY,
    projectId: process.env.REACT_APP_P_ID,
    storageBucket: process.env.REACT_APP_S_BUCKET,
    messagingSenderId: process.env.REACT_APP_MS_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_M_ID
};

const appInit = initializeApp(fbConfig);
export const db = getDatabase(appInit);