<template>
	<section>
		<p-button style="color:white" label="Return Back" class="p-button-outlined back-button" @click="goBack" />
		<div class="analysis-content">
			<h1>Comprehensive Analysis</h1>
			<div v-if="!viewEvaluation" class="anaysis-container">
				<div class="analysis-suggestion">
					<div>
						<i class="pi pi-user" style="fontSize: 3rem"></i>
						<h3>
							Hello User!&nbsp; We noticed that the Air Quality status in your surroundings is quite
							{{ period.category }}!<br />It has an AQI rating of {{ period.aqi }}!
						</h3>
					</div>
				</div>

				<div class="analysis-suggestion suggestion" v-if="!viewEvaluation">
					<div class="suggestion-header">
						<h3>
							We provided here some solutions and suggestions that might help you:
						</h3>
					</div>
					<div class="suggestion-results">
						<SuggestionView :tabs="tabs" />
					</div>

					<div class="suggestion-header" style="margin-top:1rem">
						<h3>
							Does the suggestions cannot help with your current situation?
						</h3>
					</div>
					<div class="suggestion-query">
						<h5>Enter the the reason below.</h5>
						<form @submit.prevent="querySubmit">
							<Textarea v-model.trim="queryReason" :autoResize="true" rows="1" cols="40" />
							<div>
								<p-button style="color:white" label="Submit" class="p-button-outlined submit-button" type="submit" />
							</div>
						</form>
					</div>
				</div>
			</div>
			<div class="analyze-loader" v-if="isLoading">
				<i class="pi pi-spin pi-spinner" style="fontSize: 8rem;margin-bottom:1rem"></i>
				<h1>Analyzing Your Answer</h1>
			</div>
			<div class="suggestionEvaluation" v-if="showEvaluation">
				<SuggestionEvaluation :queryReason="queryReason" @modifySolutionView="modifyView" />
			</div>
		</div>
	</section>
</template>

<script>
import suggestiondata from '../datasets/suggestiondata'
import SuggestionView from './SuggestionView'
import SuggestionEvaluation from './SuggestionEvaluation'

import Textarea from 'primevue/textarea'
export default {
	components: {
		SuggestionView,
		SuggestionEvaluation,
		Textarea,
	},
	props: ['period'],
	emits: ['show-solution'],
	mounted() {
		this.showSuggestions()
	},
	data() {
		return {
			tabs: null,
			queryReason: '',
			viewEvaluation: false,
			showEvaluation: false,
			isLoading: false,
		}
	},
	// updated() {
	// 	const checker = this.$store.getters['viewEvaluationGetter']
	// 	if (checker) {
	// 		this.viewEvaluation = !checker
	// 		this.showEvaluation = !checker
	// 	}
	// 	console.log(checker)
	// },
	methods: {
		goBack() {
			this.$emit('show-solution', false)
		},
		modifyView(value) {
			this.showEvaluation = value
			this.viewEvaluation = value
		},
		showSuggestions() {
			if (this.period.category) {
				suggestiondata.forEach((category) => {
					if (category.superTitle === this.period.category) {
						const body = []
						category.body.forEach((item) => {
							body.push({
								title: item.title,
								content: item.content,
							})
						})
						this.tabs = [...body]
						return
					}
				})
			}
		},
		querySubmit() {
			console.log(this.queryReason)
			if (this.queryReason == '') {
				alert('Enter Something first :)')
			} else {
				this.viewEvaluation = true
				this.isLoading = true
				setTimeout(() => {
					this.isLoading = false
					this.showEvaluation = true
				}, 2000)
			}
		},
	},
}
</script>

<style scoped>
section {
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
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
.back-button {
	justify-self: start;
	align-self: flex-start;
	padding: 0.6rem 1.8rem 0.6rem 1.8rem;
}
.analysis-content {
	height: auto;
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
.analysis-content h1 {
	font-size: 1.8rem;
	margin-block-start: 0rem;
	margin-block-end: 0.5rem;
}
.anaysis-container {
	width: 100%;
}
.analysis-suggestion {
	height: auto;
	width: 100%;
	padding: 1rem;
	background: #23232e;
	border: 3px solid #16161d83;
	border-radius: 0.5rem;
	display: flex;
	flex-direction: column;
}
.analysis-suggestion h3 {
	margin-block-start: 0rem;
	margin-block-end: 0rem;
}
.analysis-suggestion div {
	display: flex;
	align-items: center;
}
.analysis-suggestion div h3 {
	margin-left: 1rem;
	font-size: 0.9rem;
	width: 100%;
	text-align: center;
}
.suggestion {
	height: 100%;
	margin-top: 0.2rem;
}
.suggestion-header {
	display: flex;
	justify-content: center;
}
.suggestion-results {
	height: auto;
	width: 100%;
	margin: 1rem 0rem 0rem 0rem;
}
.suggestion-query {
	width: 100%;
	display: flex;
	flex-direction: column;
}
.suggestion-query h5 {
	margin: 0.5rem 0rem 0.5rem 0rem;
}

form {
	display: flex;
	width: 100%;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.submit-button {
	width: 7rem;
	margin: 1rem 0rem 0rem 0rem;
	padding: 0.5rem;
}
.analyze-loader {
	width: 100%;
	padding: 10rem 0rem 10rem 0rem;
	margin-top: 0.3rem;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background: #23232e;
	border: 3px solid #16161d83;
	border-radius: 0.5rem;
}

.suggestionEvaluation {
	height: auto;
	width: 100%;
	margin-top: 0.2rem;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background: #23232e;
	border: 3px solid #16161d83;
	border-radius: 0.5rem;
}
@media only screen and (max-width: 600px) {
	.back-button {
		margin: 1rem 0rem 1rem 0rem;
		justify-self: center;
		align-self: center;
	}
}
@media only screen and (min-height: 1080px) {
	.analysis-content {
		font-size: 1.3rem;
	}
	.analysis-suggestion {
		padding: 5rem;
	}
	.analysis-suggestion i {
		margin-right: 1rem;
	}
	.analysis-suggestion div h3 {
		margin-left: 1rem;
		font-size: 1.3rem;
		width: 100%;
		text-align: center;
	}
}
</style>
