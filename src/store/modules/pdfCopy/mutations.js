export default {
	storeAirQuality(state, payload) {
		state.lat = payload.lat
		state.long = payload.long
		state.place = payload.place
		state.period = payload.period
	},
	storeWeather(state, payload) {
		state.weather = payload.weather
	},
	storeSuggestion(state, payload) {
		state.suggestion = payload.suggestion
	},
	storeEvaluation(state, payload) {
		state.queryReason = payload.queryReason
		state.sentimentBody = payload.sentimentBody
		state.chartDataForSentiment = payload.chartDataForSentiment
	},
	storeToxicity(state, payload) {
		state.chartDataForToxicity = payload.chartDataForToxicity
		state.probabilityMatches = payload.probabilityMatches
	},
}
