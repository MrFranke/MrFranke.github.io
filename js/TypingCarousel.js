class TypingCarousel {
	constructor(rootElm, props) {
		this.root = rootElm;
		this.textCounter = 0;
		this.props = Object.assign({
			texts: [],
			typeDalay: 200,
			callback: () => {}
		}, props || {});
	}

	addCursore() {
		const cursorElm = document.createElement('span');
		cursorElm.classList.add('typing-carosel__cursore');
		cursorElm.innerHTML += '|';
		this.root.appendChild(cursorElm);
	}

	addTextWrap() {
		const textElm = document.createElement('span');
		textElm.classList.add('typing-carosel__text');
		this.textElm = textElm;
		this.root.prepend(textElm);
	}

	doType() {
		const prevText = this.props.texts[this.textCounter - 1] || '';
        let text = this.props.texts[this.textCounter];
        text = text.slice(prevText.length - text.length);

		text.split('').forEach((letter, i) => {
			setTimeout(() => {
				this.textElm.innerHTML += letter;
				if (i === text.length - 1) {
					this.nextTik();
				}
			}, this.props.typeDalay * i);
		});
	}

	compareText(prev, next) {
		prev = prev || '';
		return prev.length - next.length;
	}

	removeLetter(substrSize) {
		for (let i = 0; i < substrSize; i++) {
			setTimeout(() => {
				this.textElm.innerHTML = this.textElm.innerHTML.slice(0, -1);
				if (i === substrSize - 1) {
					this.nextTik();
				}
			}, this.props.typeDalay * i / 2);
		}
	}

	nextTik() {
		this.textCounter++;
		const prevText = this.props.texts[this.textCounter - 1];
		const next = this.props.texts[this.textCounter];
		let diff = 0;
		if (!next) {
			this.props.callback();
			return;
		}
		diff = this.compareText(prevText, next);
		setTimeout(() => {
			if (diff > 0) {
				this.removeLetter(diff);
			} else {
				this.doType();
			}
		}, 900);
	}

	start() {
		if (!this.props.texts.length) { throw new Error('Empty texts list!'); }
		this.addTextWrap();
		this.addCursore();
		this.doType();
	}
}