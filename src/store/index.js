import { createStore } from 'vuex'
import pdfCopyModule from './modules/pdfCopy/index'
import fireStoreModule from './modules/fireStore/index'

const store = createStore({
	modules: {
		pdf: pdfCopyModule,
		firestore: fireStoreModule,
	},
	state() {
		return {
			displayModal: false,
		}
	},
	actions: {
		viewPdfModal(context, data) {
			context.commit('viewPdfModal', data)
		},
	},
	mutations: {
		viewPdfModal(state, payload) {
			state.displayModal = payload
		},
	},
	getters: {
		viewEvaluationGetter(state) {
			return state.displayModal
		},
	},
})

export default store
