<template>
	<section class="section">
		<div class="section__img">
			<img class="section__img__bg" src="../assets/contact-design.svg" alt="contact img" />
		</div>
		<div class="section__form">
			<h1>CONTACT US</h1>
			<hr />
			<h5>Have a question? Want to collaborate?</h5>
			<form @submit.prevent="handleForm" class="form">
				<input type="text" name="name" id="name" placeholder="Name" class="form__name" required autofocus />
				<input type="email" name="email" id="email" placeholder="Enter Email" class="form__email" required />
				<textarea
					name="message"
					id=""
					cols="30"
					rows="10"
					placeholder="Your Message"
					class="form__message"
					required
				></textarea>
				<div class="form__button__container ">
					<button class="form__button__container__button">Submit</button>
				</div>
			</form>
		</div>
	</section>
</template>

<script>
export default {}
</script>

<style scoped>
section {
	padding: 7rem;
	display: flex;
	height: 100vh;
}
.section__img,
.section__form {
	width: 50%;
	height: 100%;
	margin: auto;
}
.section__img {
	display: flex;
	align-items: center;
	justify-content: center;
}
.section__img__bg {
	width: 60%;
}
.section__form {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
.section__form hr {
	width: 7rem;
	background: white;
	border: 1.5px solid white;
}
h1,
h5 {
	margin-block-start: 0;
	margin-block-end: 0;
}
h1 {
	font-size: 2rem;
}
h5 {
	margin-top: 2rem;
	font-size: 1rem;
	font-weight: 500;
	color: #babae0;
}
.form {
	width: 100%;
	margin-top: 2rem;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.form input,
.form textarea {
	width: 100%;
	margin-bottom: 0.5rem;
	padding: 0.5rem;
	background: #23232e;
	font-size: 1.1rem;
	border: none;
	color: white;
	outline: none;
}
.form__button__container {
	width: 100%;
	display: flex;
	justify-content: flex-end;
}
.form__button__container__button {
	padding: 0.5rem 2rem;
	background: none;
	border: 2px solid white;
	color: white;
	font-size: 1rem;
	font-family: 'Open Sans';
	transition: all 0.5s;
}
.form__button__container__button:hover {
	background: white;
	color: black;
	cursor: pointer;
}

@media only screen and (min-height: 1080px) {
	.form input,
	.form textarea {
		padding: 1.5rem;
	}
	section {
		padding: 12rem;
	}
	.section__img__bg {
		width: 90%;
	}
	.section__img {
		margin-right: 2rem;
	}
}

@media only screen and (max-width: 600px) {
	.section {
		padding: 1rem;
	}
	.section__img {
		display: none;
	}
	.section__form {
		width: 100%;
		padding-top: 5rem;
		justify-content: flex-start;
	}
	.form__button__container {
		margin-top: 1rem;
		justify-content: center;
	}
	.form input,
	.form textarea {
		margin-bottom: 1rem;
	}
}
</style>
