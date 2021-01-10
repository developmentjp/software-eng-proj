<template>
	<div class="toPdf__body__st__container">
		<div class="toPdf__body__sentiment">
			<p class="toPdf__body__sentiment-label">Sentiment Analysis</p>
			<p>Predicted User Status: {{ status }}</p>
			<p>Words:</p>
			<div class="toPdf__body__sentiment-words">
				<div class="toPdf__body__sentiment-words--pos">
					<p style="color: green">Positive</p>
					<p v-for="word in positiveWords" :key="word">{{ word }}</p>
				</div>
				<div class="toPdf__body__sentiment-words--neg">
					<p style="color: red">Negative</p>
					<p v-for="word in negativeWords" :key="word">{{ word }}</p>
				</div>
			</div>
		</div>
		<div class="toPdf__body__toxicity">
			<ToxicityChart />
		</div>
	</div>
	<div class="toPdf__body__st__container__message">
		<span v-if="!threatsDisplay">
			Base from the Analysis you are under the threat of [<span v-for="threat in threats" :key="threat"
				>&nbsp;~{{ threat }}~</span
			>].
		</span>
		<span v-html="threatsDisplay"></span>
	</div>
	<div class="toPdf__body__suggestions">
		<div class="toPdf__body__suggestions-label">
			<p>Suggestions and Solutions&nbsp;&nbsp;</p>
			<i class="pi pi-share-alt"></i>
		</div>
		<ToPdfSuggestions />
	</div>
</template>

<script>
import ToxicityChart from './ToxicityChart'
import ToPdfSuggestions from './ToPdfSuggestions'
export default {
	components: {
		ToxicityChart,
		ToPdfSuggestions,
	},
	beforeMount() {
		this.fetchProbabiltyMatches()
	},
	data() {
		return {
			fetchedData: null,
			threats: [],
			threatsDisplay: null,
			status: null,
			positiveWords: [],
			negativeWords: [],
		}
	},
	methods: {
		fetchProbabiltyMatches() {
			this.fetchedData = this.$store.getters['pdf/getState']
			this.fetchThreats()
			this.fetchWords()
		},
		fetchThreats() {
			if (this.fetchedData.probabilityMatches === null) {
				this.threatsDisplay = `<span style='color: rgb(253, 85, 85);'>No Data Available For Threats</span>`
			} else {
				let index = 0
				this.fetchedData.probabilityMatches.forEach((match) => {
					if (match === true) {
						this.threats.push(this.fetchedData.field[index])
						index += 1
					}
				})
				if (this.threats.length <= 0) {
					this.threats.push('Nothing! You are Safe')
				}
			}
		},
		fetchWords() {
			if (this.fetchedData.sentimentBody === null) {
				this.status = 'No Data'
				this.positiveWords.push('No Data')
				this.negativeWords.push('No Data')
			} else {
				this.status = this.fetchedData.sentimentBody.status
				this.fetchedData.sentimentBody.positiveWords.forEach((word) => {
					this.positiveWords.push(word)
				})
				this.fetchedData.sentimentBody.negativeWords.forEach((word) => {
					this.negativeWords.push(word)
				})
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
	height: auto;
}
.toPdf__body__sentiment {
	width: 100%;
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
	/* height: 100%; */
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
	background: #23232e;
	color: white;
}
.toPdf__body__suggestions {
	display: flex;
	flex-direction: column;
}
.toPdf__body__suggestions-label {
	width: 16rem;
	padding: 0.3rem;
	margin: 0.5rem 0rem 0rem 0rem;
	border-radius: 0.25rem;
	background: #79cdcd;
	font-weight: 1000;
	display: flex;
	align-items: center;
}
@media only screen and (max-width: 600px) {
	.toPdf__body__st__container {
		margin: 0rem 0.3rem 0rem 0.7rem;
		display: flex;
		flex-direction: column;
	}
	.toPdf__body__toxicity {
		margin-top: 0.5rem;
	}
	.toPdf__body__suggestions {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.toPdf__body__st__container__message {
		padding: 0.3rem;
		margin-left: 0.7rem;
	}
}
</style>
