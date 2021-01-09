// <!-- The core Firebase JS SDK is always required and must be listed first -->
// <script src="https://www.gstatic.com/firebasejs/8.2.2/firebase-app.js"></script>
// <!-- TODO: Add SDKs for Firebase products that you want to use
//      https://firebase.google.com/docs/web/setup#available-libraries -->
// Your web app's Firebase configuration

import firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/firestore'

var firebaseConfig = {
	apiKey: 'AIzaSyDUHxt4t2nYeUTmnBHMGlQPe7TjipOEfI8',
	authDomain: 'support-air.firebaseapp.com',
	projectId: 'support-air',
	storageBucket: 'support-air.appspot.com',
	messagingSenderId: '369590453285',
	appId: '1:369590453285:web:ddec9f30edf29439322bcc',
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const projectFirestore = firebase.firestore()

export { projectFirestore }
