import { createStore } from 'vuex'

const store = createStore({
	state() {
		return {
			viewEvaluation: false,
		}
	},
	actions: {
		changeViewEvaluation(context, data) {
			context.commit('setEvaluation', data)
		},
	},
	mutations: {
		setEvaluation(state, payload) {
			state.viewEvaluation = payload
		},
	},
	getters: {
		viewEvaluationGetter(state) {
			return state.viewEvaluation
		},
	},
})

export default store
