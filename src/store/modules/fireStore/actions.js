// import projectFirestore from '../../../firebase/config'
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

export default {
	async getSuggestionData(context, data) {
		const suggestion = []
		try {
			const snapshot = await projectFirestore.collection('airquality').get()
			snapshot.forEach((doc) => {
				// console.log(doc.id, '=>', doc.data()) validate data fetched
				if (doc.id === data) {
					let obj = doc.data()
					obj.body.forEach((item) => {
						suggestion.push(item)
					})
				}
			})
			// console.log(suggestion)
			context.commit('getSuggestionData', suggestion)
			// context.commit('getSuggestionData', { ...suggestion })
		} catch (err) {
			console.log(err)
		}
	},

	async getToxicityData(context, data) {
		const suggestion = []
		try {
			const snapshot = await projectFirestore.collection('toxicity').get()
			snapshot.forEach((doc) => {
				data.forEach((d) => {
					if (doc.id == d.toLowerCase()) {
						let content = doc.data()
						content.body.forEach((obj) => {
							suggestion.push(obj)
						})
					}
				})
			})
			// console.log(suggestion) check if exists
			context.commit('getToxicityData', suggestion)
		} catch (err) {
			console.log(err)
		}
	},
}
