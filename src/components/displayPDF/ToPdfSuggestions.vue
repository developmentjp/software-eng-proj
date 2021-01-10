<template>
	<div class="toPdf__body__suggestions__item" v-for="item in suggestion" :key="item">
		<p class="toPdf__body__suggestions__item-title">{{ item.title }}</p>
		<p class="toPdf__body__suggestions__item-content">
			{{ item.content }}
		</p>
	</div>
	<p class="toPdf__body__suggestions__item--callback callback__noSuggestionData" v-if="noData">Data Unavailable</p>
</template>

<script>
export default {
	data() {
		return {
			suggestion: null,
			noData: false,
		}
	},
	beforeMount() {
		this.fetchSuggestions()
	},
	methods: {
		fetchSuggestions() {
			const data = this.$store.getters['pdf/getState']
			const val = this.$store.getters['firestore/getState'] //fetching data from firestore
			//merging toxicity suggestions with airquality suggestions
			if (val.toxicitySuggestions !== null) {
				const suggestion = data.suggestion.concat(val.toxicitySuggestions)
				this.suggestion = suggestion
			} else {
				this.suggestion = data.suggestion
			}
			console.log(this.suggestion)
			if (this.suggestion === null) {
				this.noData = true
			}
		},
	},
}
</script>

<style scoped>
p {
	margin-block-start: 0rem;
	margin-block-end: 0rem;
}
.toPdf__body__suggestions__item {
	margin: 0.5rem 0.5rem 0rem 0rem;
	border-radius: 0.5rem;
	background: #23232e;
	color: white;
	line-height: 1rem;
}
.toPdf__body__suggestions__item-title {
	padding: 0.3rem 0.3rem 0.3rem 0.3rem;
	border-top-right-radius: 0.5rem;
	border-top-left-radius: 0.5rem;
	color: white;
	background: #70bebea4;
	font-weight: 700;
}
.toPdf__body__suggestions__item-content {
	padding: 0.3rem 0.3rem 0.3rem 0.3rem;
}
.toPdf__body__suggestions__item--callback {
	margin: 0.5rem 0.5rem 0rem 0rem;
	padding: 1rem;
	border-radius: 0.5rem;
	background: #23232e;
	color: white;
	line-height: 1rem;
}
.callback__noSuggestionData {
	color: rgb(253, 85, 85);
}
@media only screen and (max-width: 600px) {
	.toPdf__body__suggestions__item {
		margin-left: 0.5rem;
		width: 95%;
	}
}
</style>
