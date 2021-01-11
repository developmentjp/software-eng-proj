<template>
	<div class="modal" @click="closeModalBackground"></div>
	<div class="modal__download" v-if="displayDownloadModal">
		<DownloadModal
			@closePdfDownload="closePdfDownloadModal"
			@downloadFromModal="downloadAndCloseModal"
			@closeAllModal="closeModalBackground"
		/>
	</div>
	<div class="toPdf">
		<div ref="pdfDocument">
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

		<div class="toPdf__button">
			<div class="toPdf__button--close" @click="closeModalBackground">
				<p>&nbsp;Close Modal</p>
				<i class="pi pi-times" style="fontSize: 2rem; marginLeft:0.5rem"></i>
			</div>
			<div class="toPdf__button--download" @click="downloadPDF">
				<p>&nbsp;Download PDF Copy</p>
				<i class="pi pi-download" style="fontSize: 2rem; marginLeft:0.5rem"></i>
			</div>
		</div>
	</div>
</template>

<script>
import html2pdf from 'html2pdf.js'

import ToPdfRight from './ToPdfRight'
import ToPdfLeft from './ToPdfLeft'
import DownloadModal from './DownloadModal'
export default {
	components: {
		ToPdfRight,
		ToPdfLeft,
		DownloadModal,
	},
	props: ['viewModal', 'downloadPDFProp'],
	emits: ['closeModal', 'close-modal'],
	data() {
		return {
			dateName: null,
			display: false,
			displayDownloadModal: this.downloadPDFProp,
		}
	},
	methods: {
		closeModalBackground() {
			this.$emit('close-modal')
		},
		downloadPDF() {
			this.getDate()
			html2pdf(this.$refs.pdfDocument.innerHTML, {
				margin: 0,
				filename: `mySession@${this.dateName}.pdf`,
				image: { type: 'jpeg', quality: 1 },
				html2canvas: {
					dpi: 192,
					letterRendering: true,
					width: 792,
					height: 900,
				},
			})
		},
		getDate() {
			let d = new Date()
			let date = d.getDate()
			let month = d.getMonth() + 1 // Since getMonth() returns month from 0-11 not 1-12
			let year = d.getFullYear()
			this.dateName = date + '/' + month + '/' + year
		},
		closePdfDownloadModal() {
			this.displayDownloadModal = false
		},
		downloadAndCloseModal() {
			this.downloadPDF()
			this.closeModalBackground()
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
	height: 100%;
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
	margin-left: 1rem;
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
.toPdf__button {
	padding: 1rem;
	display: flex;
	justify-content: center;
}
.toPdf__button--download {
	padding: 0.5rem 1rem;
	margin-right: 0.5rem;
	display: flex;
	align-items: center;
	border: 2px solid #3b3b4e;
	border-radius: 0.25rem;
	color: #1c1c25;
	background: white;
}
.toPdf__button--download:hover {
	background: #3b3b4e;
	border: 1px solid #3b3b4e;
	color: white;
	cursor: pointer;
}
.toPdf__button--close {
	padding: 0.5rem 1rem;
	margin-right: 0.5rem;
	display: flex;
	align-items: center;
	border: 2px solid #3b3b4e;
	border-radius: 0.25rem;
	color: white;
	background: #3b3b4e;
}
.toPdf__button--close:hover {
	background: white;
	color: #3b3b4e;
	cursor: pointer;
}
@media only screen and (max-width: 600px) {
	.modal {
		height: 100%;
	}
	.toPdf {
		width: 90vw;
		top: 0px;
		left: 5vw;
	}
	.toPdf__heading {
		padding: 1rem 0.5rem;
		margin: 0.5rem 0rem;
	}
	.toPdf__heading__title {
		font-size: 1.75rem;
	}
	.toPdf__body {
		flex-direction: column;
	}
	.toPdf__body-right {
		margin-left: 0rem;
	}
	footer {
		flex-direction: column;
		align-items: center;
	}
	footer a {
		text-decoration: none;
		color: white;
		cursor: pointer;
	}
	.toPdf__button {
		flex-direction: column;
	}
	.toPdf__button--close {
		margin-bottom: 0.5rem;
		justify-content: center;
	}
}
.toPdf__button--download {
	justify-content: center;
}
</style>
