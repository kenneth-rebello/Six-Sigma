import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
    apiKey: "AIzaSyDSf4bJyVR5jc9AQN8-gG4251KNBLscfO0",
    authDomain: "sixsigma-532de.firebaseapp.com",
    databaseURL: "https://sixsigma-532de.firebaseio.com",
    projectId: "sixsigma-532de",
    storageBucket: "sixsigma-532de.appspot.com",
    messagingSenderId: "1057426859412",
    appId: "1:1057426859412:web:f12b2bde1a100e3d809b81",
    measurementId: "G-R463T5NSZK"
}

export const createUserProfile = async (userAuth, additionalData) => {

    if(userAuth){
        const userRef = firestore.doc(`users/${userAuth.uid}`);

        const snapShot = await userRef.get();
        if(!snapShot.exists){

            const { displayName, email } = userAuth;
            const createdAt = new Date();

            try {
                await userRef.set({
                    displayName,
                    email,
                    createdAt,
                    ...additionalData
                })
            }catch(err){
                console.log('Error creating message'+err.message)
            }
        }
        return userRef;
    }

}



firebase.initializeApp(config);

export const auth = firebase.auth();

export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;