<template>
	<div class="modal"></div>
	<div class="pdfDownloadModal">
		<div class="pdfDownloadModal__header">
			<p class="pdfDownloadModal__header__title">Do you want to see the Digital Summary First?</p>
			<i class="pi pi-times pdfDownloadModal__header__cross" @click="closeModal"></i>
		</div>
		<div class="pdfDownloadModal__button">
			<div class="pdfDownloadModal__button--close" @click="closePdfDownloadModal">
				<p>&nbsp;View Session Summary</p>
				<i class="pi pi-eye" style="fontSize: 2rem; marginLeft:0.5rem"></i>
			</div>
			<div class="pdfDownloadModal__button--download" @click="downloadPDF">
				<p>&nbsp;Download Now</p>
				<i class="pi pi-download" style="fontSize: 2rem; marginLeft:0.5rem"></i>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	emits: [
		'closePdfDownload',
		'close-pdf-download',
		'downloadFromModal',
		'download-from-modal',
		'closeAllModal',
		'close-all-modal',
	],
	methods: {
		closePdfDownloadModal() {
			this.$emit('close-pdf-download')
		},
		downloadPDF() {
			this.$emit('download-from-modal')
		},
		closeModal() {
			this.$emit('close-all-modal')
		},
	},
}
</script>

<style scoped>
p {
	margin-block-start: 0rem;
	margin-block-end: 0rem;
}
.modal {
	top: 0px;
	left: 0px;
	position: fixed;
	height: 100%;
	width: 100vw;
	background: rgba(0, 0, 0, 0.63);
	z-index: 250;
	overflow: hidden;
}
.pdfDownloadModal {
	padding: 1rem 1rem 0rem 1rem;
	width: 43rem;
	border-bottom-left-radius: 1rem;
	border-bottom-right-radius: 1rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	position: absolute;
	top: 0rem;
	z-index: 300;
	background: #1c1c25;
}
.pdfDownloadModal__header {
	width: 100%;
	display: flex;
	justify-content: flex-end;
	align-items: center;
}
.pdfDownloadModal__header__cross {
	margin-left: 8rem;
}
.pdfDownloadModal__header i:hover {
	color: red;
	cursor: pointer;
}
.pdfDownloadModal__button {
	padding: 1rem;
	display: flex;
	justify-content: center;
}
.pdfDownloadModal__button--download {
	padding: 0.5rem 1rem;
	margin-right: 0.5rem;
	display: flex;
	align-items: center;
	justify-content: center;
	border: 2px solid #3b3b4e;
	border-radius: 0.25rem;
	color: #1c1c25;
	background: white;
}
.pdfDownloadModal__button--download:hover {
	background: #3b3b4e;
	border: 1px solid #3b3b4e;
	color: white;
	cursor: pointer;
}
.pdfDownloadModal__button--close {
	padding: 0.5rem 1rem;
	margin-right: 0.5rem;
	display: flex;
	align-items: center;
	justify-content: center;
	border: 2px solid #3b3b4e;
	border-radius: 0.25rem;
	color: white;
	background: #3b3b4e;
}
.pdfDownloadModal__button--close:hover {
	background: white;
	color: #3b3b4e;
	cursor: pointer;
}
@media only screen and (max-width: 600px) {
	.pdfDownloadModal {
		padding-top: 1rem;
		width: 100%;
		border-bottom-left-radius: 1rem;
		border-bottom-right-radius: 1rem;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.pdfDownloadModal__button {
		flex-direction: column;
		padding: 0.55rem 0rem 1rem 0rem;
	}
	.pdfDownloadModal__button--close {
		margin-bottom: 0.5rem;
	}
	.pdfDownloadModal__header {
		display: block;
		padding: 0rem 2rem 0rem 2rem;
	}
	.pdfDownloadModal__header__title {
		text-align: center;
	}
	.pdfDownloadModal__header__cross {
		width: 94.2%;
		padding: 0.5rem 0rem;
		margin: 0.3rem 0rem 0rem 0.22rem;
		border: 2px solid #3b3b4e;
		border-radius: 0.25rem;
		text-align: center;
		color: white;
		background: #3b3b4e;
		font-size: 1.5rem;
	}
}
</style>
