<template>
	<Chart type="bar" :data="basicData" />
</template>

<script>
import Chart from 'primevue/chart'
export default {
	components: {
		Chart,
	},
	data() {
		return {
			basicData: null,
		}
	},
	beforeMount() {
		this.fetchChartData()
	},
	methods: {
		fetchChartData() {
			const data = this.$store.getters['pdf/getState']
			this.basicData = data.chartDataForToxicity
		},
	},
}
</script>

<style scoped></style>
