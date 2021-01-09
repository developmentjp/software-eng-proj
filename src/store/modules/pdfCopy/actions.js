export default {
	storeAirQuality(context, data) {
		context.commit('storeAirQuality', data)
	},
	storeWeather(context, data) {
		context.commit('storeWeather', data)
	},
	storeSuggestion(context, data) {
		context.commit('storeSuggestion', data)
	},
	storeEvaluation(context, data) {
		context.commit('storeEvaluation', data)
	},
	storeToxicity(context, data) {
		context.commit('storeToxicity', data)
	},
}
