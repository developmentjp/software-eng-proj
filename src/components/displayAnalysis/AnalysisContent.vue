<template>
	<ToPdf v-if="viewModal" :viewModal="viewModal" @closeModal="closeModalView" :downloadPDFProp="downloadPDFProp" />
	<section>
		<div class="analysis-content">
			<div class="analysis-content__btn__container">
				<div class="back__button" @click="goBack">
					<i class="pi pi-angle-double-left" style="fontSize: 2rem"></i>
					<p>&nbsp;Back</p>
				</div>
				<div class="pdf__button__container">
					<div class="pdf__button" @click="viewPdfSummary">
						<p>&nbsp;View Session Summary</p>
						<i class="pi pi-eye" style="fontSize: 2rem; marginLeft:0.5rem"></i>
					</div>
					<div class="pdf__button--download" @click="downloadPDF">
						<p>&nbsp;Download PDF Copy</p>
						<i class="pi pi-download" style="fontSize: 2rem; marginLeft:0.5rem"></i>
					</div>
				</div>
			</div>
			<!-- <h1>Comprehensive Analysis</h1> -->
			<div v-if="!viewEvaluation" class="anaysis-container">
				<div class="analysis-suggestion">
					<h1>Comprehensive Analysis</h1>
					<div>
						<i class="pi pi-user" style="fontSize: 3rem"></i>
						<h3>
							Hello User!&nbsp; We noticed that the Air Quality status in your surroundings is quite
							<span :style="{ color: period.category === 'good' ? 'green' : 'red' }"
								>{{ period.category }} <span v-if="period.category === 'good'">&#128512;</span
								><span v-else>&#128532;</span></span
							>
							<!-- <br />It has an AQI rating of {{ period.aqi }}! -->
						</h3>
					</div>
				</div>

				<div class="analysis-suggestion suggestion" v-if="!viewEvaluation">
					<div class="suggestion-header">
						<h3 v-if="showNewSolution">
							We noticed that your current situation is
							<span :style="{ color: situation.toLowerCase() === 'positive' ? 'green' : 'red' }">{{ situation }}</span
							>.
							<span v-if="situation.toLowerCase() === 'negative'"
								>We provided here additional solutions that may assist you &#128221;</span
							><span v-if="situation.toLowerCase() === 'positive'"
								>&nbsp;Hope You will always have a good day &#128513;</span
							>
						</h3>
						<h3 v-if="!showNewSolution">
							We provided here some solutions and suggestions that might help you &#128221;
						</h3>
					</div>
					<div class="suggestion-results">
						<SuggestionView :tabs="tabs" />
					</div>

					<div class="suggestion__question__container">
						<div class="suggestion__question__header" style="margin-top:1rem">
							<h3>
								Does the suggestions cannot help with your current situation?
							</h3>
						</div>
						<div class="suggestion-query">
							<h5>Enter the the reason below.</h5>
							<form @submit.prevent="querySubmit">
								<Textarea v-model.trim="queryReason" :autoResize="true" rows="5" cols="40" autofocus />
								<div>
									<button class="suggestion-query__submit__button" type="submit">Submit</button>
								</div>
							</form>
						</div>
					</div>

					<div class="suggestion-contact">
						<p class="suggestion-contact__label">Are there any problems with the solutions that we provided you?</p>
						<div class="pdf__button--download suggestion-contact__button" @click="redirectToContactPage">
							<p>&nbsp;Send Us Message</p>
							<i class="pi pi-envelope" style="fontSize: 2rem; marginLeft:0.5rem"></i>
						</div>
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
// import suggestiondata from '../datasets/suggestiondata'
import SuggestionView from './SuggestionView'
import SuggestionEvaluation from './SuggestionEvaluation'
import ToPdf from '../displayPDF/ToPdf'

import Textarea from 'primevue/textarea'
export default {
	components: {
		SuggestionView,
		SuggestionEvaluation,
		Textarea,
		ToPdf,
	},
	props: ['period'],
	emits: ['showSolution', 'show-solution'],
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
			viewModal: false,
			downloadPDFProp: false,
			showNewSolution: false,
			situation: null,
		}
	},
	methods: {
		goBack() {
			this.$emit('show-solution', false)
		},
		modifyView(value) {
			this.showEvaluation = value.display
			this.viewEvaluation = value.display
			//update user status
			if (value.status.toLowerCase() === 'negative') {
				this.showNewSolution = true
				this.situation = 'Negative'
			} else {
				this.showNewSolution = true
				this.situation = 'Positive'
			}
			this.queryReason = null
			// fetching data from store uncomment when production/real test reactivity
			const val = this.$store.getters['firestore/getState'] //fetching data from store
			if (val.toxicitySuggestions !== null) {
				//merging toxicity suggestions with airquality suggestions
				this.tabs = val.airQualitySuggestions.concat(val.toxicitySuggestions)
				// console.log(this.tabs)

				// //storing data to new store
				// try {
				// 	this.$store.dispatch('pdf/storeSuggestion', {
				// 		suggestion: this.tabs,
				// 	})
				// } catch (err) {
				// 	alert('failed to store data', err)
				// 	console.log(err)
				// }
			} else {
				this.tabs = val.airQualitySuggestions
			}
		},
		showSuggestions() {
			if (this.period.category) {
				// manual setup based from dummydata
				// suggestiondata.forEach((category) => {
				// 	if (category.superTitle === this.period.category) {
				// 		const body = []
				// 		category.body.forEach((item) => {
				// 			body.push({
				// 				title: item.title,
				// 				content: item.content,
				// 			})
				// 		})
				// 		this.tabs = [...body]
				// 		console.log(this.tabs)
				// 		return
				// 	}
				// })

				// fetching data from store uncomment when production/real test reactivity
				const val = this.$store.getters['firestore/getState'] //fetching data from store
				if (val.toxicitySuggestions !== null) {
					//merging toxicity suggestions with airquality suggestions
					this.tabs = val.airQualitySuggestions.concat(val.toxicitySuggestions)
					// console.log(this.tabs)
				} else {
					this.tabs = val.airQualitySuggestions
				}
				//storing datta to store
				try {
					this.$store.dispatch('pdf/storeSuggestion', {
						suggestion: this.tabs,
					})
				} catch (err) {
					alert('failed to store data', err)
					console.log(err)
				}
			}
		},
		querySubmit() {
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
		viewPdfSummary() {
			this.viewModal = true
		},
		closeModalView() {
			this.viewModal = false
			this.downloadPDFProp = false
		},
		downloadPDF() {
			this.downloadPDFProp = true
			this.viewModal = true
		},
		redirectToContactPage() {
			this.$router.push('/contact')
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
.analysis-content__btn__container {
	width: 100%;
	display: flex;
	justify-content: space-between;
	margin-bottom: 1rem;
}
.back__button {
	padding: 0.5rem 1rem;
	display: flex;
	border: 1px solid white;
	border-radius: 0.25rem;
}
.back__button:hover {
	background: white;
	border: 1px solid white;
	color: #23232e;
	cursor: pointer;
}
.pdf__button__container {
	display: flex;
}
.pdf__button {
	padding: 0.5rem 1rem;
	margin-right: 0.5rem;
	display: flex;
	border: 1px solid white;
	border-radius: 0.25rem;
}
.pdf__button:hover {
	background: white;
	border: 1px solid white;
	color: #23232e;
	cursor: pointer;
}
.pdf__button--download {
	padding: 0.5rem 1rem;
	display: flex;
	border: 1px solid white;
	border-radius: 0.25rem;
	color: #1c1c25;
	background: white;
}
.pdf__button--download:hover {
	background: #3b3b4e;
	border: 1px solid #3b3b4e;
	color: white;
	cursor: pointer;
}
.analysis-content {
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	/* justify-content: center; */
}
.analysis-content h1 {
	font-size: 1.8rem;
	margin-block-start: 0rem;
	margin-block-end: 0.5rem;
}
.anaysis-container {
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
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
	align-items: center;
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
	font-size: 0.9rem;
	width: 100%;
	text-align: center;
}
.suggestion__question__container {
	width: 100%;
	padding: 2rem 0rem;
	margin-top: 1rem;
	background: #1c1c25;
	border-radius: 1rem;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.suggestion__question__header {
	margin-bottom: 1rem;
}
.suggestion {
	/* height: 100%; */
	flex: 1;
	margin-top: 0.3rem;
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

.suggestion-query__submit__button {
	padding: 0.5rem 2rem;
	margin-top: 1rem;
	border: 1px solid white;
	border-radius: 0.25rem;
	font-size: 1.5rem;
	background: white;
	color: #1c1c25;
}
.suggestion-query__submit__button:hover {
	background: #3b3b4e;
	border: 1px solid #3b3b4e;
	color: white;
	cursor: pointer;
}
.analyze-loader {
	height: 100%;
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
	height: 100%;
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
.suggestion-contact {
	width: 100%;
	padding: 1rem;
	margin-top: 1rem;
	background: #1c1c25;
	border-radius: 1rem;
	display: flex;
	justify-content: space-between;
}
.suggestion-contact__label {
	font-size: 1.25rem;
}
@media only screen and (max-width: 600px) {
	.analysis-content__btn__container {
		padding: 0rem 1rem;
		margin: 1rem 0rem 1rem 0rem;
		flex-direction: column;
	}
	.back__button {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.pdf__button__container {
		flex-direction: column;
	}
	.pdf__button {
		margin: 0.5rem 0rem;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.pdf__button--download {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.suggestion-query__submit__button {
		font-size: 1.25rem;
	}
	.analysis-suggestion h1 {
		font-size: 1.5rem;
	}
	.suggestion-contact {
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.suggestion-contact__label {
		margin-bottom: 0.5rem;
		text-align: center;
		font-size: 0.9rem;
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
	.analysis-content__btn__container {
		margin-bottom: 2.3rem;
		margin-left: 0.1rem;
	}
}
@media only screen and (min-height: 900px) {
	.analysis-content {
		/* margin-top: 1rem; */
		font-size: 1.3rem;
	}
	.analysis-suggestion {
		padding: 2rem;
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
	.analysis-content__btn__container {
		margin-bottom: 1rem;
		margin-left: 0.3rem;
	}
}
</style>
