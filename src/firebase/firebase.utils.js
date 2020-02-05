import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const config=  {
    apiKey: "AIzaSyBswrp3reKUF8GKZoJLqJktcW_tHl9X4WQ",
    authDomain: "crwn-db-36ff0.firebaseapp.com",
    databaseURL: "https://crwn-db-36ff0.firebaseio.com",
    projectId: "crwn-db-36ff0",
    storageBucket: "crwn-db-36ff0.appspot.com",
    messagingSenderId: "385706818996",
    appId: "1:385706818996:web:c6755d51c06f93c11c86e1",
    measurementId: "G-NPGYH15MJ1"
  };
  export const createUserProfileDocument = async (userAuth, additionalData) => {
  	if(!userAuth) return;
  	const userRef=firestore.doc(`users/${userAuth.uid}`);
  	const snapShot = await userRef.get();
  	

  	if(!snapShot.exists){
  		const {displayName, email} = userAuth;
  		const createdAt = new Date();

  		try{
  			await userRef.set({
  				displayName,
  				email,
  				createdAt,
  				...additionalData
  			})

  		}
  		catch(error){
  			console.log('error creting user', error.message);
  		}
  	}
  	return userRef; 

  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();

  export const firestore = firebase.firestore();

  const provider=new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });

  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;