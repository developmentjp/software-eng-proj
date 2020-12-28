<template>
	<section>
		<div class="heading">
			<h1>Context Evaluation Report &nbsp;</h1>
			<!-- <i class="pi pi-briefcase" style="fontSize: 1.5rem"></i> -->
		</div>
		<div class="body">
			<div class="dashboard">
				<div class="list">
					<div class="word">
						<div class="word-title pos">
							<h1>Positive Words</h1>
						</div>
						<div class="word-body">
							<ul>
								<li v-for="positive in sentimentBody.positiveWords" :key="positive">
									{{ positive }}
								</li>
							</ul>
						</div>
					</div>
					<div class="word">
						<div class="word-title neg">
							<h1>Negative Words</h1>
						</div>
						<div class="word-body">
							<ul>
								<li v-for="negative in sentimentBody.negativeWords" :key="negative">
									{{ negative }}
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div class="chart">
					<Chart type="pie" :data="chartData" />
				</div>
			</div>

			<div class="toxicity-body">
				<div class="heading">
					<div class="toxicity">
						<h1>Toxicity Analysis</h1>
						<p><i>*Analysis via Tensorflow.js Toxicity Model</i></p>
					</div>
				</div>
				<ToxicityAnalysis :queryReason="queryReason" @changeSolutionView="changeSolution" />
			</div>
		</div>
	</section>
</template>

<script>
import Chart from 'primevue/chart'
import Sentiment from 'sentiment'
import ToxicityAnalysis from './ToxicityAnalysis'
let sentiment = new Sentiment()
export default {
	components: {
		Chart,
		ToxicityAnalysis,
	},
	props: ['queryReason'],
	emits: ['modify-solution-view'],
	mounted() {
		this.analyzeSentiment()
	},
	data() {
		return {
			anotherQueryReason: '',
			sentimentResult: null,
			sentimentBody: {
				status: '',
				words: null,
				positiveWords: null,
				negativeWords: null,
			},
			chartData: null,
		}
	},
	methods: {
		changeSolution(value) {
			this.$emit('modify-solution-view', value)
		},
		async analyzeSentiment() {
			if (this.queryReason) {
				const result = await sentiment.analyze(this.queryReason)
				this.sentimentResult = result
				this.analyzeScore()
			} else {
				alert('No query')
			}
		},
		analyzeScore() {
			if (this.sentimentResult.score === null) {
				console.log('Failed analysis')
			} else {
				if (this.sentimentResult.score > 0) {
					this.sentimentBody.status = 'Positive'
				} else {
					this.sentimentBody.status = 'Negative'
				}
				this.sentimentBody.words = [...this.sentimentResult.words]
				this.sentimentBody.positiveWords = [...this.sentimentResult.positive]
				this.sentimentBody.negativeWords = [...this.sentimentResult.negative]
				let data1 = this.sentimentBody.positiveWords.length
				let data2 = this.sentimentBody.negativeWords.length
				this.chartData = {
					labels: ['Positive Words', 'Negative Words'],
					datasets: [
						{
							data: [data1, data2],
							backgroundColor: ['rgba(49, 255, 49, 0.644)', 'rgba(255, 47, 47, 0.692)'],
							hoverBackgroundColor: ['rgba(0, 184, 0, 0.644)', 'rgba(148, 0, 0, 0.692)'],
						},
					],
				}
			}
			console.log(this.sentimentBody)
		},
	},
}
</script>

<style scoped>
section {
	height: auto;
	width: 100%;
	padding: 1rem 1rem;
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
}
h1,
h2,
h3,
h4,
h5,
h6,
p {
	margin-block-start: 0rem;
	margin-block-end: 0rem;
}
.heading {
	width: 100%;
	margin: 0rem 0rem 0.5rem 0rem;
	display: flex;
	justify-content: center;
	font-size: 1.5rem;
}
.heading .toxicity {
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.heading .toxicity p {
	font-size: 0.7rem;
}
.dashboard {
	height: 30%;
	display: flex;
	margin-bottom: 0.5rem;
}
.dashboard .list,
.chart {
	width: 50%;
	padding: 0.5rem;
	display: flex;
}
.chart {
	/* max-height: 10rem; */
	align-items: center;
	justify-content: center;
	border-radius: 1rem;
	background: #16161d;
}
.p-chart:first-child {
	height: auto;
	width: 100%;
}
.list {
	height: auto;
	width: 50%;
	padding: 0rem !important;
	justify-content: space-between;
}
.list .word {
	height: 125%;
	width: 50%;
	margin: 0rem 0.3rem 0rem 0rem;
	border-radius: 1rem;
}
.word .word-title {
	padding: 0.5rem;
	border-top-right-radius: 1rem;
	border-top-left-radius: 1rem;
	background: #16161d;
	text-align: center;
	font-size: 1.3rem;
}
.pos {
	border-bottom: 2px solid green;
}
.pos h1 {
	color: rgba(49, 255, 49, 0.644);
}
.neg {
	border-bottom: 2px solid red;
}
.neg h1 {
	color: rgba(255, 47, 47, 0.692);
}
.word-body {
	height: 80%;
	width: 100%;
	border-bottom-left-radius: 1rem;
	border-bottom-right-radius: 1rem;
	padding: 0.5rem;
	background: #16161d;
}
.word ul {
	height: 100%;
	margin: 0rem;
	padding: 0rem;
	list-style: none;
	text-align: center;
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;
	justify-content: flex-start;
	overflow-y: scroll;
}
.word ul::-webkit-scrollbar {
	width: 0.2rem;
}
.word ul::-webkit-scrollbar-track {
	background: #16161d;
}
.word ul::-webkit-scrollbar-thumb {
	background: #ffffff;
}
.word ul li {
	width: 100%;
}
.toxicity-body {
	height: 30%;
	padding: 0.5rem;
	border-radius: 1rem;
	background: #16161d;
	display: flex;
	flex-direction: column;
	justify-items: center;
	align-items: center;
}

@media only screen and (max-height: 667px) {
	.word {
		height: 100% !important;
	}
}
@media only screen and (min-height: 720px) {
	.list {
		height: 9.4rem;
	}
}
@media only screen and (min-height: 1080px) {
	.list {
		height: 15.3rem;
	}
	.p-chart {
		height: 10rem;
	}
}
@media only screen and (max-width: 600px) {
	section {
		padding: 0rem;
	}
	.dashboard {
		height: auto;
		display: flex;
		flex-direction: column;
	}
	.chart,
	.list {
		width: 100% !important;
	}
	.list {
		height: auto;
		display: flex;
		flex-direction: column;
	}
	.word {
		width: 100% !important;
		margin-bottom: 0.5rem !important;
	}
}
</style>
