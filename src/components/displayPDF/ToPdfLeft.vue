<template>
	<div class="toPdf__body__place">
		<p class="toPdf__body__place__label">Location</p>
		<p class="toPdf__body__place-location">Manila</p>
		<p class="toPdf__body__place-location-description">NCR, PH</p>
		<p>Longitude: 123.123</p>
		<p>Latitude: 123.123</p>
	</div>

	<div class="toPdf__body__environment">
		<p class="toPdf__body__environment__label">Environment Status</p>
		<p class="toPdf__body__environment-head">Air Quality&nbsp;<i class="pi pi-align-center"></i></p>
		<p>Air Quality Index: 30</p>
		<p>Category: Good</p>
		<p>Dominant Pollutant: pm.25</p>
		<p class="toPdf__body__environment-head" style="margin-top: 0.5rem">
			Weather Status&nbsp;<i class="pi pi-chart-line"></i>
		</p>
		<p>Temperature: 54°C || 150°F</p>
		<p>Wind Speed: 12 KM/H</p>
		<p>Humidity: 54%</p>
	</div>

	<div class="toPdf__body__query">
		<p class="toPdf__body__query__label">User Query</p>
		<p>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro consectetur illo harum. Nobis cupiditate, error
			doloremque, voluptatum consequatur natus exercitationem voluptatem fuga doloribus iure totam.
		</p>
	</div>
</template>

<script>
export default {}
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
	width: 22rem;
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
	font-size: 1.5rem;
}

.toPdf__body__environment {
	padding: 0rem 0rem 2rem 1rem;
	margin-top: 1rem;
	width: 22rem;
	border-bottom-right-radius: 2rem;
	border-top-right-radius: 0.5rem;
	background: #23232e;
	font-weight: 100;
	color: white;
}
.toPdf__body__environment__label {
	margin-left: 38%;
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
	width: 22rem;
	border-bottom-right-radius: 2rem;
	border-top-right-radius: 0.5rem;
	background: #23232e;
	font-weight: 100;
	color: white;
}
.toPdf__body__query__label {
	margin-left: 63%;
	margin-bottom: 1rem;
	padding-left: 0.5rem;
	border-bottom-left-radius: 0.5rem;
	background: #79cdcd;
	font-size: 1.25rem;
	color: black;
}
</style>
