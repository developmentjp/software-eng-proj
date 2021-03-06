<template>
	<section>
		<table>
			<caption class="caption">
				AQI Basics for Ozone and Particle Pollution
			</caption>
			<thead>
				<tr>
					<th scope="col">Daily AQI Color</th>
					<th scope="col">Levels of Concern</th>
					<th scope="col">Values of Index</th>
					<th scope="col">Description of Air Quality</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td data-label="Daily AQI Color" class="green">Green</td>
					<td data-label="Levels of Concern">Good</td>
					<td data-label="Values of Index">0 to 50</td>
					<td data-label="Description of Air Quality">
						Air quality is satisfactory, and air pollution poses little or no risk.
					</td>
				</tr>

				<tr>
					<td data-label="Daily AQI Color" class="yellow">Yellow</td>
					<td data-label="Levels of Concern">Moderate</td>
					<td data-label="Values of Index">51 to 100</td>
					<td data-label="Description of Air Quality">
						Air quality is acceptable. However, there may be a risk for some people, particularly those who are
						unusually sensitive to air pollution.
					</td>
				</tr>

				<tr>
					<td data-label="Daily AQI Color" class="orange">Orange</td>
					<td data-label="Levels of Concern">
						Unhealthy for Sensitive Groups
					</td>
					<td data-label="Values of Index">101 to 150</td>
					<td data-label="Description of Air Quality">
						Members of sensitive groups may experience health effects. The general public is less likely to be affected.
					</td>
				</tr>

				<tr>
					<td data-label="Daily AQI Color" class="red">Red</td>
					<td data-label="Levels of Concern">Unhealthy</td>
					<td data-label="Values of Index">151 to 200</td>
					<td data-label="Description of Air Quality">
						Some members of the general public may experience health effects; members of sensitive groups may experience
						more serious health effects.
					</td>
				</tr>

				<tr>
					<td data-label="Daily AQI Color" class="purple">Purple</td>
					<td data-label="Levels of Concern">Very Unhealthy</td>
					<td data-label="Values of Index">201 to 300</td>
					<td data-label="Description of Air Quality">
						Health alert: The risk of health effects is increased for everyone.
					</td>
				</tr>

				<tr>
					<td data-label="Daily AQI Color" class="maroon">Maroon</td>
					<td data-label="Levels of Concern">Hazardous</td>
					<td data-label="Values of Index">301 and higher</td>
					<td data-label="Description of Air Quality">
						Health warning of emergency conditions: everyone is more likely to be affected.
					</td>
				</tr>
			</tbody>
		</table>
		<button class="table-view__button" @click="check">View Solutions and Suggestions</button>
	</section>
</template>

<script>
export default {
	emits: ['show-solution'],
	methods: {
		check() {
			this.$emit('show-solution', true)
		},
	},
}
</script>

<style scoped>
section {
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 100%;
	background: #23232e;
	border: 3px solid #16161d83;
	border-radius: 0.5rem;
	padding: 1rem;
}
.table-view__button {
	padding: 0.5rem 2rem;
	margin-top: 1rem;
	border: 1px solid white;
	border-radius: 0.25rem;
	font-size: 1.5rem;
	background: white;
	color: #1c1c25;
}
.table-view__button:hover {
	background: #3b3b4e;
	border: 1px solid #3b3b4e;
	color: white;
	cursor: pointer;
}
table {
	border: 1px solid #ccc;
	border-collapse: collapse;
	margin: 0rem 0rem 0.5rem 0rem;
	padding: 0;
	width: 100%;
	table-layout: fixed;
}

.caption {
	font-size: 1.2em;
	font-weight: 700;
	margin: 0.5rem 0rem 1rem 0rem;
}

table tr {
	/* background-color: #888282; */
	border: 1px solid rgb(255, 255, 255);
	padding: 0.35em;
}

table th,
table td {
	padding: 0.625em;
	text-align: center;
}

table th {
	font-size: 0.7rem;
	letter-spacing: 0.1em;
	text-transform: uppercase;
}
thead {
	font-size: 0.9rem;
	font-weight: 700;
}
tbody {
	font-size: 0.77rem;
	font-weight: 500;
}

.green {
	background: rgb(0, 228, 0);
	color: black;
}

.yellow {
	background: yellow;
	color: black;
}

.orange {
	background: rgb(255, 126, 0);
	color: white;
}

.red {
	background: red;
	color: white;
}
.purple {
	background: rgb(143, 63, 151);
	color: white;
}
.maroon {
	background: rgb(126, 0, 35);
	color: white;
}
@media screen and (max-width: 600px) {
	section {
		width: 100%;
		margin: none !important;
	}
	.caption {
		margin-top: 1rem;
	}
	table {
		border: 0;
		width: 100%;
	}

	table caption {
		font-size: 1.3em;
	}

	table thead {
		border: none;
		clip: rect(0 0 0 0);
		height: 1px;
		margin: -1px;
		overflow: hidden;
		padding: 0;
		position: absolute;
		width: 1px;
	}

	table tr {
		border-bottom: 3px solid #ddd;
		display: block;
		margin-bottom: 0.625em;
	}

	table td {
		border-bottom: 1px solid #ddd;
		display: block;
		font-size: 0.8em;
		text-align: right;
	}

	table td::before {
		/*
    * aria-label has no advantage, it won't be read inside a table
    content: attr(aria-label);
    */
		content: attr(data-label);
		float: left;
		font-weight: bold;
		text-transform: uppercase;
	}

	table td:last-child {
		border-bottom: 0;
	}
}
@media only screen and (min-height: 900px) {
	* {
		font-size: 1.1rem;
	}
	section {
		/* padding-top: 5rem; */
	}
}
@media only screen and (min-height: 1080px) {
	* {
		font-size: 1.1rem;
	}
	/* table {
    height: 80%;
  } */
	section {
		height: 93%;
	}
	.p-button {
		padding: 2rem 2rem 1rem 2rem;
		font-size: 1.3rem;
	}
}
</style>
