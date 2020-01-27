(function (window) {

	function hideLoading(helloText) {
		document.body.classList.remove('loading');

		// When blackout finished hide
		document
			.querySelector('.js-blackout')
			.addEventListener('animationend', () => {
				helloText.start();
			});
	}


	window.onload = () => {
		const helloText = new TypingCarousel(document.querySelector('.hello-window__wrapper'), {
			texts: [  `Hi! My name is Mike. I'm front-end`,
				`Hi! My name is Mike. I'm `,
				`Hi! My name is Mike. I'm back-end`,
				`Hi! My name is Mike. I'm `,
				`Hi! My name is Mike. I'm UX`,
				`Hi! My name is Mike. I'm `,
				`Hi! My name is Mike. I'm developer.`]
		});
		setTimeout(() => {
			hideLoading(helloText);
		}, 2000);

	};
})(window);

