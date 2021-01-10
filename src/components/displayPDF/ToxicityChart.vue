<template>
	<!-- <Chart type="bar" :options="options" :data="basicData" v-if="!noData" /> -->
	<p>
		The Analysis to classify whether the user is currently in a good or bad situation based from the entered query is
		done using a sentimental analysis module
		<a
			class="external"
			href="https://www.npmjs.com/package/sentiment#afinn-based-sentiment-analysis-for-nodejs"
			target="_blank"
			><i class="pi pi-external-link"></i
		></a>
		that uses the
		<a
			href="http://www2.imm.dtu.dk/pubdb/pubs/6010-full.html"
			target="_blank"
			style="text-decoration:none; color:#79cdcd"
			>AFINN-165</a
		>
		wordlist and Emoji Sentiment Ranking.
	</p>
	<p>
		Toxicity Analysis was made possible by a pre-trained TensorFlow.js model.
		<a class="external" href="tensorflow.org/js/models" target="_blank"><i class="pi pi-external-link"></i></a>
	</p>
	<!-- <p class="callback__noChartData" v-if="noData">Data Unavailable</p> -->
</template>

<script>
// import Chart from 'primevue/chart'
export default {
	components: {
		// Chart,
	},
	data() {
		return {
			basicData: null,
			noData: false,
			options: {
				responsive: true,
			},
		}
	},
	beforeMount() {
		this.fetchChartData()
	},
	methods: {
		fetchChartData() {
			const data = this.$store.getters['pdf/getState']
			this.basicData = data.chartDataForToxicity
			console.log(data)
			if (this.basicData === null) {
				this.noData = true
			}
		},
	},
}
</script>

<style scoped>
p {
	font-size: 0.8rem;
}
.callback__noChartData {
	color: rgb(253, 85, 85);
	text-align: center;
}
.external {
	color: #79cdcd;
}
.external:hover:after {
	padding: 0.2rem;
	background: #23232e;
	content: 'View External Link';
	position: absolute;
	border-radius: 0.25rem;
	font-size: 0.7rem;
}
</style>
