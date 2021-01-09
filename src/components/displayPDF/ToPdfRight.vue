<template>
	<div class="toPdf__body__st__container">
		<div class="toPdf__body__sentiment">
			<p class="toPdf__body__sentiment-label">Sentiment Analysis</p>
			<p>Predicted User Status: Negative</p>
			<p>Words:</p>
			<div class="toPdf__body__sentiment-words">
				<div class="toPdf__body__sentiment-words--pos">
					<p style="color: green">Positive</p>
					<p>Good</p>
					<p>Honest</p>
					<p>Loyal</p>
				</div>
				<div class="toPdf__body__sentiment-words--neg">
					<p style="color: red">Negative</p>
					<p>Bad</p>
					<p>Mad</p>
					<p>Punch</p>
				</div>
			</div>
		</div>
		<div class="toPdf__body__toxicity">
			<ToxicityChart />
		</div>
	</div>
	<div class="toPdf__body__st__container__message">
		Base from the Analysis, you are under the threat of&nbsp;[<span v-for="threat in threats" :key="threat"
			>&nbsp;{{ threat }}</span
		>].
	</div>
</template>

<script>
import ToxicityChart from './ToxicityChart'
export default {
	components: {
		ToxicityChart,
	},
	beforeMount() {
		this.fetchProbabiltyMatches()
	},
	data() {
		return {
			threats: [],
		}
	},
	methods: {
		fetchProbabiltyMatches() {
			const data = this.$store.getters['pdf/getState']
			let index = 0
			data.probabilityMatches.forEach((match) => {
				if (match === true) {
					this.threats.push(data.field[index])
					index += 1
				}
			})
			if (this.threats.length <= 0) {
				this.threats.push('Nothing! You are Safe')
			}
		},
	},
}
</script>

<style scoped>
h1,
h2,
h3,
h4,
h5,
h6,
p {
	margin-block-end: 0rem;
	margin-block-start: 0rem;
}
.toPdf__body__st__container {
	display: flex;
}
.toPdf__body__sentiment {
	padding: 0.5rem;
	margin-right: 0.5rem;
	background: #23232e;
	color: white;
	border-radius: 0.5rem;
	text-align: center;
}
.toPdf__body__sentiment-label {
	text-align: center;
	color: #79cdcd;
}
.toPdf__body__sentiment-words {
	display: flex;
	justify-content: space-around;
}
.toPdf__body__sentiment-words--pos,
.toPdf__body__sentiment-words--neg {
	text-align: center;
}
.toPdf__body__toxicity {
	flex: 1;
	height: 90%;
	padding: 0.5rem;
	margin-right: 0.5rem;
	background: #23232e;
	color: white;
	border-radius: 0.5rem;
}
.toPdf__body__st__container__message {
	margin-right: 0.7rem;
	margin-top: 0.25rem;
	border-radius: 0.25rem;
	text-align: center;
	background: #23232ed3;
	color: white;
}
</style>
