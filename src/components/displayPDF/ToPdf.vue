<template>
	<div class="modal" @click="closeModalBackground"></div>
	<div class="toPdf">
		<div class="toPdf__heading">
			<h1 class="toPdf__heading__title">Support<span style="color:#79CDCD">Air</span></h1>
			<i class="toPdf__heading__description">Your digital supporter that will help you anytime, anywhere!</i>
		</div>

		<div class="toPdf__body">
			<div class="toPdf__body-left">
				<ToPdfLeft />
			</div>
			<div class="toPdf__body-right">
				<ToPdfRight />
			</div>
		</div>

		<footer>
			<p><i class="pi pi-envelope"></i>&nbsp;supportair@gmail.com</p>
			<p>&#169;&nbsp;2021 Support<span style="color:#79CDCD">Air</span></p>
			<a href="http://google.com" target="_blank">www.supportAir.web.app</a>
		</footer>
	</div>
</template>

<script>
import ToPdfRight from './ToPdfRight'
import ToPdfLeft from './ToPdfLeft'
export default {
	components: {
		ToPdfRight,
		ToPdfLeft,
	},
	props: ['viewModal'],
	emits: ['closeModal', 'close-modal'],
	methods: {
		closeModalBackground() {
			this.$emit('close-modal')
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
.modal {
	top: 0px;
	left: 0px;
	position: fixed;
	height: 100vh;
	width: 100vw;
	background: rgba(0, 0, 0, 0.63);
	z-index: 100;
	overflow: hidden;
}
.toPdf {
	top: 0px;
	left: 20vw;
	height: auto;
	width: 60vw;
	/* background: #23232e; */
	background: white;
	color: #23232e;
	position: absolute;
	z-index: 200;
}
.toPdf__heading {
	padding: 2rem 1rem;
	margin: 1rem 0rem;
	background: #23232e;
	color: white;
}
.toPdf__body {
	display: flex;
}
.toPdf__body-left {
	flex: 1;
}
.toPdf__body-right {
	flex: 2;
}
.toPdf__heading__title {
	font-size: 2.5rem;
}
footer {
	padding: 0.3rem;
	margin-top: 1rem;
	width: 100%;
	display: flex;
	justify-content: space-around;
	background: #23232e;
	color: white;
}
footer a {
	text-decoration: none;
	color: white;
	cursor: pointer;
}
</style>
