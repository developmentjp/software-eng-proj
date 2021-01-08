import { createStore } from 'vuex'

const store = createStore({
	state() {
		return {
			displaySuggestionEvaluation: false,
		}
	},
	actions: {
		changeViewEvaluation(context, data) {
			context.commit('setEvaluation', data)
		},
	},
	mutations: {
		setEvaluation(state, payload) {
			state.displaySuggestionEvaluation = payload
		},
	},
	getters: {
		viewEvaluationGetter(state) {
			return state.viewEvaluation
		},
	},
})

export default store
