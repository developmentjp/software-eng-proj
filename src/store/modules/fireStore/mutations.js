export default {
	getSuggestionData(state, payload) {
		state.airQualitySuggestions = payload
	},
	getToxicityData(state, payload) {
		state.toxicitySuggestions = payload
	},
}
