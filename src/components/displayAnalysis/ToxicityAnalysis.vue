<template>
	<div class="container">
		<Chart type="bar" :data="basicData" />
		<div class="analysis">
			<p>Analysis Summary</p>
			<p v-for="(matches, index) in probabilityMatches" :key="matches">
				{{ field[index] }}: <i style="color: red">{{ matches.toString().toUpperCase() }}</i>
			</p>
		</div>
		<div @click="setEvaluationTrue" class="analysis-btn-container">
			<h3 class="analysis-btn-header">Click To View New Solutions</h3>
			<i class="pi pi-arrow-circle-right analysis-btn" style="fontSize: 4rem"></i>
		</div>
	</div>
</template>

<script>
import '@tensorflow/tfjs'
import * as toxicity from '@tensorflow-models/toxicity'
import Chart from 'primevue/chart'
export default {
	components: {
		Chart,
	},
	props: ['queryReason'],
	emits: ['change-solution-view'],
	mounted() {
		this.calculateToxicity()
	},
	data() {
		return {
			basicData: null,
			field: ['Identity Attack', 'Insult', 'Obscene', 'Severe Toxicity', 'Sexual Eplicit', 'Threat', 'Toxicity'],
			probabilityMatches: null,
		}
	},
	methods: {
		setEvaluationTrue() {
			console.log('logo clicked')
			this.$store.dispatch('changeViewEvaluation', true)
			this.$emit('change-solution-view', false)
		},
		async calculateToxicity() {
			const threshold = 0.9
			const sentences = [this.queryReason]
			// toxicity.load(threshold).then((model) => {
			//   const sentences = [this.queryReason];
			//   model.classify(sentences).then((predictions) => {
			//     console.log(predictions);
			//   });
			// });
			const model = await toxicity.load(threshold)
			const predictions = await model.classify(sentences)
			const labels = []
			const matches = []
			const probs = []
			for (let obj = 0; obj < predictions.length; obj++) {
				labels.push(predictions[obj].label)
				matches.push(predictions[obj].results[0].match)
				// probs.push(predictions[obj].results[0].probabilities);
				let aveProb = 0
				let count = 0
				for (let prob = 0; prob < predictions[obj].results[0].probabilities.length; prob++) {
					aveProb += predictions[obj].results[0].probabilities[prob]
					count++
				}
				aveProb = aveProb / count
				// let value = toString(aveProb);
				// console.log(value.substr(0, 4));
				// aveProb = parseFloat(value);
				if (aveProb > 1) {
					probs.push(1.0)
				} else {
					probs.push(aveProb)
				}
			}
			console.log(matches)
			this.probabilityMatches = [...matches]
			this.basicData = {
				labels: ['Identity Attack', 'Insult', 'Obscene', 'Severe Toxicity', 'Sexual Explicit', 'Threat', 'Toxicity'],
				datasets: [
					{
						label: 'Prediction Probability',
						backgroundColor: '#42A5F5',
						data: [...probs],
					},
				],
			}
		},
	},
}
</script>

<style scoped>
.container {
	height: 60%;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
}
.p-chart {
	height: 100%;
	width: 55%;
	margin: 0rem 0.5rem 0rem 0.5rem;
	padding: 2rem;
	border-radius: 1rem;
	background: #0f0f18;
}
.analysis {
	height: 100%;
	margin: 0rem 0.5rem 0rem 0rem;
	/* padding: 1rem; */
	border-radius: 1rem;
	background: #0f0f18;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	font-size: 0.79rem;
	line-height: 0rem;
}
.analysis-btn-container {
	width: 90%;
	display: flex;
	flex-direction: column;
	align-items: center;
	cursor: pointer;
}
.analysis-btn-header {
	text-align: center;
	font-size: 0.9rem;
}
.analysis-btn-container:hover {
	color: #323252;
}
@media only screen and (max-height: 667px) {
	.p-chart {
		width: 51% !important;
	}
	.analysis {
		width: 100%;
		font-size: 1rem;
		padding: 2rem 2rem !important;
	}
}
@media only screen and (max-height: 720px) {
	.analysis {
		font-size: 0.6rem;
		padding: 2.3rem 1rem;
	}
}
@media only screen and (min-height: 1080px) {
	.p-chart {
		width: 50%;
	}
	.analysis {
		padding: 3.2rem;
	}
}
@media only screen and (max-width: 600px) {
	.container {
		display: flex;
		flex-direction: column;
	}
	.p-chart {
		height: 100%;
		width: 100%;
		margin: 0rem 0.3rem 0.5rem 0.3rem;
	}
	.analysis {
		height: 100%;
		width: 100%;
		margin: 0rem 0.3rem 0.5rem 0.3rem;
	}
}
</style>
