import mutations from './mutations.js'
import actions from './actions.js'
import getters from './getters.js'
export default {
	namespaced: true,
	state() {
		return {
			lat: null, //from->
			long: null,
			place: null,
			period: null, // -> comming from tabs "airQuality.vue"
			weather: null, //coming from weather "weatherPlace.vue"
			suggestion: null, //coming from tabs "analysisContent.vue"
			queryReason: null, //from ->
			sentimentBody: null,
			chartDataForSentiment: null, //->coming from tabs "suggestionEvaluation.vue"
			field: ['Identity Attack', 'Insult', 'Obscene', 'Severe Toxicity', 'Sexual Eplicit', 'Threat', 'Toxicity'], //from ->
			chartDataForToxicity: null,
			probabilityMatches: null, //-> coming from tabs "toxicityAnalysis.vue"
		}
	},
	mutations,
	actions,
	getters,
}
