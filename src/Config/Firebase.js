import firebaseApp from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyAqG7RIyGKOgOkhtgaMoKrl42XQTHoWsdU',
  authDomain: 'local-storm-273503.firebaseapp.com',
  databaseURL: 'https://local-storm-273503.firebaseio.com',
  projectId: 'local-storm-273503',
  storageBucket: 'local-storm-273503.appspot.com',
  messagingSenderId: '211695418498',
  appId: '1:211695418498:web:21c928f19870fafd25089b',
  measurementId: 'G-D1Q4H8XNC1',
};
let app = firebaseApp.initializeApp(firebaseConfig);
const db = app.database();
const auth = app.auth();
const storage = app.storage();

export {db, auth, storage};
