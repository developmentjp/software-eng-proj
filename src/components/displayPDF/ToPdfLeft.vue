<template>
	<div class="toPdf__body__place">
		<p class="toPdf__body__place__label">Location</p>
		<p class="toPdf__body__place-location">{{ place.name.toUpperCase() }}</p>
		<p class="toPdf__body__place-location-description">
			{{ place.state.toUpperCase() }}&nbsp; {{ place.country.toUpperCase() }}
		</p>
		<p class="toPdf__body__place-location-description">Latitude: {{ place.lat }}</p>
		<p class="toPdf__body__place-location-description">Longitude: {{ place.long }}</p>
	</div>

	<div class="toPdf__body__environment">
		<p class="toPdf__body__environment__label">Environment Status</p>
		<p class="toPdf__body__environment-head">Air Quality&nbsp;<i class="pi pi-align-center"></i></p>
		<p class="toPdf__body__environment-des">Air Quality Index: {{ air.aqi }}</p>
		<p class="toPdf__body__environment-des">Category: {{ air.category.toUpperCase() }}</p>
		<p class="toPdf__body__environment-des">Dominant Pollutant: {{ air.dominant }}</p>

		<p class="toPdf__body__environment-head" style="margin-top: 0.5rem">
			Weather Status&nbsp;<i class="pi pi-chart-line"></i>
		</p>
		<p class="toPdf__body__environment-des">Temperature: {{ weather.tempC }}°C&nbsp; || &nbsp;{{ weather.tempF }}°F</p>
		<p class="toPdf__body__environment-des">Wind Speed: {{ weather.windSpeed }} KM/H</p>
		<p class="toPdf__body__environment-des">Humidity: {{ weather.humidity }}%</p>
	</div>

	<div class="toPdf__body__query">
		<p class="toPdf__body__query__label">User Query</p>
		<p>
			{{ query }}
		</p>
	</div>
</template>

<script>
export default {
	data() {
		return {
			data: null,
			place: {
				name: null,
				state: null,
				country: null,
				long: null,
				lat: null,
			},
			air: {
				aqi: null,
				category: null,
				dominant: null,
			},
			weather: {
				tempC: null,
				tempF: null,
				windSpeed: null,
				humidity: null,
			},
			query: null,
		}
	},
	beforeMount() {
		this.fetchData()
	},
	methods: {
		fetchData() {
			this.data = this.$store.getters['pdf/getState']
			this.fetchPlace()
			this.fetchAir()
			this.fetchWeather()
			this.fetchQuery()
		},
		fetchPlace() {
			if (this.data.place !== null) {
				this.place.name = this.data.place.name
				this.place.state = this.data.place.state
				this.place.country = this.data.place.country
			} else {
				this.place.name = 'No Data'
				this.place.state = 'No Data'
				this.place.country = 'No Data'
			}
			if (this.data.lat !== null) {
				this.place.lat = this.data.lat
			} else {
				this.place.lat = 'No Data'
			}
			if (this.data.long !== null) {
				this.place.long = this.data.long
			} else {
				this.place.lat = 'No Data'
			}
		},
		fetchAir() {
			if (this.data.period !== null) {
				this.air.aqi = this.data.period.aqi
				this.air.category = this.data.period.category
				this.air.dominant = this.data.period.dominant
			} else {
				this.air.aqi = 'No Data'
				this.air.category = 'No Data'
				this.air.dominant = 'No Data'
			}
		},
		fetchWeather() {
			if (this.data.weather !== null) {
				this.weather.tempC = this.data.weather.tempC
				this.weather.tempF = this.data.weather.tempF
				this.weather.windSpeed = this.data.weather.windKPH
				this.weather.humidity = this.data.weather.humidity
			} else {
				this.weather.tempC = 'No Data'
				this.weather.tempF = 'No Data'
				this.weather.windSpeed = 'No Data'
				this.weather.humidity = 'No Data'
			}
		},
		fetchQuery() {
			if (this.data.queryReason !== null) {
				this.query = this.data.queryReason
			} else {
				this.query = 'No Data'
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
.toPdf__body__place {
	padding: 0rem 0rem 2rem 1rem;
	width: 24rem;
	border-bottom-right-radius: 2rem;
	border-top-right-radius: 0.5rem;
	background: #23232e;
	font-weight: 100;
	color: white;
}
.toPdf__body__place__label {
	margin-left: 70%;
	padding-left: 0.5rem;
	border-bottom-left-radius: 0.5rem;
	background: #79cdcd;
	font-size: 1.25rem;
	color: black;
}
.toPdf__body__place-location {
	font-size: 2rem;
}
.toPdf__body__place-location-description {
	font-size: 1.1rem;
}

.toPdf__body__environment {
	padding: 0rem 0rem 2rem 1rem;
	margin-top: 1rem;
	width: 24rem;
	border-bottom-right-radius: 2rem;
	border-top-right-radius: 0.5rem;
	background: #23232e;
	font-weight: 100;
	color: white;
}
.toPdf__body__environment__label {
	margin-left: 42%;
	margin-bottom: 1rem;
	padding-left: 0.5rem;
	border-bottom-left-radius: 0.5rem;
	background: #79cdcd;
	font-size: 1.25rem;
	color: black;
}

.toPdf__body__environment-head {
	font-size: 1.25rem;
	color: #79cdcd;
}

.toPdf__body__query {
	padding: 0rem 0rem 2rem 1rem;
	margin-top: 1rem;
	width: 24rem;
	border-bottom-right-radius: 2rem;
	border-top-right-radius: 0.5rem;
	background: #23232e;
	font-weight: 100;
	color: white;
}
.toPdf__body__query__label {
	margin-left: 64%;
	margin-bottom: 1rem;
	padding-left: 0.5rem;
	border-bottom-left-radius: 0.5rem;
	background: #79cdcd;
	font-size: 1.25rem;
	color: black;
}
@media only screen and (max-width: 600px) {
	.toPdf__body__place {
		padding: 0rem 0rem 1rem 0.5rem;
		width: 95%;
	}
	.toPdf__body__place__label {
		font-size: 1rem;
		margin-left: 75%;
	}
	.toPdf__body__place-location {
		font-size: 1.25rem;
	}
	.toPdf__body__place-location-description {
		font-size: 0.9rem;
	}

	.toPdf__body__environment {
		padding: 0rem 0rem 1rem 0.5rem;
		width: 95%;
	}
	.toPdf__body__environment__label {
		margin-left: 47%;
		margin-bottom: 0.5rem;
		font-size: 1rem;
	}
	.toPdf__body__environment-head {
		font-size: 1.1rem;
	}
	.toPdf__body__environment-des {
		font-size: 0.9rem;
	}
	.toPdf__body__query {
		padding: 0rem 0rem 1rem 0.5rem;
		margin-bottom: 1rem;
		width: 95%;
	}
	.toPdf__body__query__label {
		margin-left: 69%;
		margin-bottom: 0.5rem;
		font-size: 1rem;
	}
}
</style>
