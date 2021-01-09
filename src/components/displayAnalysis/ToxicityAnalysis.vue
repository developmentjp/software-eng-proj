<template>
	<div class="toxicity" v-if="!displayToxicity">
		<div class="toxicity__chart">
			<Chart type="bar" :data="basicData" />
		</div>
		<div class="toxicity__analysis">
			<p>Analysis Summary</p>
			<div class="toxicity__analysis__text">
				<div class="toxicity__analysis__text-label">
					<p v-for="(matches, index) in probabilityMatches" :key="matches">{{ field[index] }}:</p>
				</div>
				<div class="toxicity__analysis__text-output">
					<i style="color: red" v-for="(matches, index) in probabilityMatches" :key="index">{{
						matches.toString().toUpperCase()
					}}</i>
				</div>
			</div>
		</div>
		<div @click="setEvaluationTrue" class="toxicity__btn__container">
			<h3 class="analysis-btn-header">Click To View New Solutions</h3>
			<i class="pi pi-arrow-circle-right analysis-btn" style="fontSize: 4rem"></i>
		</div>
	</div>
	<div class="toxicity toxicity__loader" v-if="displayToxicity">
		<i class="pi pi-spin pi-spinner toxicity__loader__icon"></i>
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
	emits: ['changeSolutionView', 'change-solution-view'],
	mounted() {
		this.calculateToxicity()
	},
	watch: {
		probabilityMatches() {
			this.displayToxicity = false
		},
	},
	data() {
		return {
			displayToxicity: true,
			basicData: null,
			field: ['Identity Attack', 'Insult', 'Obscene', 'Severe Toxicity', 'Sexual Explicit', 'Threat', 'Toxicity'],
			probabilityMatches: null,
		}
	},
	methods: {
		setEvaluationTrue() {
			this.$emit('change-solution-view', false)
		},
		async calculateToxicity() {
			const threshold = 0.9
			const sentences = [this.queryReason]
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
				if (aveProb > 1) {
					probs.push(1.0)
				} else {
					probs.push(aveProb)
				}
			}
			// console.log(matches)
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
			this.checkToxicityCategory(matches)
			//sending data to store
			try {
				this.$store.dispatch('pdf/storeToxicity', {
					chartDataForToxicity: this.basicData,
					probabilityMatches: this.probabilityMatches,
				})
			} catch (err) {
				alert('failed to store data', err)
				console.log(err)
			}
			// const t = this.$store.getters['pdf/getState']
			// console.log('hey store here', t.chartDataForToxicity, t.probabilityMatches, t.field)
		},

		checkToxicityCategory(matches) {
			let index = 0
			const obj = []
			matches.forEach((match) => {
				if (match === true) {
					console.log(match, this.field[index])
					obj.push(this.field[index])
				}
				index += 1
			})
			this.$store.dispatch('firestore/getToxicityData', obj)
		},
	},
}
</script>

<style scoped>
.toxicity {
	height: 100%;
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.toxicity__loader {
	display: flex;
	justify-content: center;
	align-items: center;
}
.toxicity__chart {
	flex: 2;
	height: 100%;
	padding: 0.5rem;
	background: #0f0f188f;
	border-radius: 0.5rem;
	display: flex;
	justify-content: center;
	align-items: center;
}
.p-chart {
	width: 100%;
}
.toxicity__analysis {
	flex: 1;
	height: 100%;
	padding: 1rem 0.5rem;
	margin: 0rem 0.5rem 0rem 0.5rem;
	background: #0f0f188f;
	border-radius: 0.5rem;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	font-size: 1.3rem;
}
.toxicity__analysis p {
	margin-block-end: 0rem;
	margin-block-start: 0rem;
}
.toxicity__btn__container {
	flex: 1;
	height: 100%;
	padding: 0.5rem;
	background: #0f0f188f;
	border-radius: 0.5rem;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	font-size: 1rem;
}
.toxicity__btn__container:hover {
	cursor: pointer;
	color: #6767818f;
}
.toxicity__analysis__text {
	height: 100%;
	width: 100%;
	padding: 1.5rem 1rem;
	display: flex;
	justify-content: space-between;
}
.toxicity__analysis__text-label {
	display: flex;
	flex-direction: column;
}
.toxicity__analysis__text-output {
	display: flex;
	flex-direction: column;
}
.toxicity__loader__icon {
	font-size: 5rem;
}

@media only screen and (max-width: 600px) {
	.toxicity {
		flex-direction: column;
	}
	.toxicity__chart,
	.toxicity__analysis,
	.toxicity__btn__container {
		width: 100%;
	}
	.toxicity__chart {
		height: 50rem;
	}
	.toxicity__analysis {
		margin: 0.5rem 0rem;
		font-size: 1rem;
	}
	.toxicity__loader__icon {
		font-size: 3rem;
	}
}
@media only screen and (min-height: 720px) {
	.list {
		height: 9.4rem;
	}
}
</style>
