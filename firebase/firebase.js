import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import firebaseConfig from './config';

class Firebase {
  constructor() {
    if (getApps().length === 0) {
      this.app = initializeApp(firebaseConfig);
    } else {
      this.app = getApp();
    }

    this.db = getFirestore(this.app);

    this.auth = initializeAuth(this.app, {
      persistence: getReactNativePersistence(ReactNativeAsyncStorage),
    });
  }
}

const firebaseInstance = new Firebase();
export default firebaseInstance;