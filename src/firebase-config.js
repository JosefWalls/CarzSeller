import firebase from "firebase/app"
import "firebase/storage"

const config = {
    apiKey: "AIzaSyC5VhoXr7iCtOusx9g8lbqGSgRuo30F2T4",
    authDomain: "autoclone-3dac1.firebaseapp.com",
    databaseURL: "https://autoclone-3dac1.firebaseio.com",
    projectId: "autoclone-3dac1",
    storageBucket: "autoclone-3dac1.appspot.com",
    messagingSenderId: "1083804532195",
    appId: "1:1083804532195:web:7872f30330f429f8c274d6",
    measurementId: "G-3NVF6HTDES"
}

firebase.initializeApp(config)

const storage = firebase.storage();

export {
    storage, firebase as default
}