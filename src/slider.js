/* Сделать выделение активного слайда
Сделать авто-прокрутку если есть поле delay
 */

export class Slider {
  constructor(selector, options) {
    this.options = options;
    this.$sliderMain = document.querySelector(selector);
    this.index = 1;
    this.countSlides = options.elements.length;
    this.#render();

    this.$sliderMain.addEventListener("click", this.eventHandler);
    this.#setActiveElement();

    options.delay && this.#setAutoScroll();
  }

  #render() {
    this.$sliderMain.innerHTML = this.#getTemplate();
  }

  #getTemplate() {
    return `
		<div class="container">
		<div class="slider" style="width: ${this.options.elements.length * 100}%">
			${this.#createSlides(this.options)}
		</div>
		${
      this.options.elements.length <= 1
        ? ""
        : `
			<div class="arrows">
				<i class="fas fa-chevron-left" data-type="arrow" data-arrow="left"></i>
				<i class="fas fa-chevron-right" data-type="arrow" data-arrow="right"></i>
			</div>`
    }
		<div class="trail">
			${this.#createTrail(this.options)}
		</div>
	</div>
		`;
  }

  #createSlides(options) {
    let wrapper = document.createElement("div");
    options.elements.forEach((elem, index) => {
      wrapper.insertAdjacentHTML(
        "beforeend",
        `
				<div class="elem" data-id="${index + 1}">
					<h1>${elem.title}</h1>
					<p>${elem.content}</p>
				</div>`
      );
      elem.color && (wrapper.querySelector(`[data-id="${index + 1}"]`).style.backgroundColor = elem.color);
      elem.img && (wrapper.querySelector(`[data-id="${index + 1}"]`).style.backgroundImage = `url('${elem.img}')`);
    });
    return wrapper.innerHTML;
  }

  #createTrail(options) {
    let wrapper = document.createElement("div");
    for (let i = 0; i < options.elements.length; ++i) {
      wrapper.insertAdjacentHTML(
        "beforeend",
        `
			<div class="block-${i + 1}" data-type="trail" data-trail="${i + 1}">${i + 1}</div>`
      );
    }
    return wrapper.innerHTML;
  }

  #setActiveElement() {
    const $elems = this.$sliderMain.querySelectorAll(".elem");
    const $trails = this.$sliderMain.querySelectorAll('[data-type="trail"]');
    [...this.$sliderMain.querySelectorAll(".active")].forEach((elem) => {
      elem.classList.remove("active");
    });
    setTimeout(() => {
      $elems[this.index - 1].classList.add("active");
    }, 200);
    $trails[this.index - 1].classList.add("active");
  }

  #setAutoScroll() {
    this.interval = setInterval(() => {
      this.scrollRight();
    }, this.options.delay);
  }

  scrollLeft() {
    this.index = this.index == 1 ? this.countSlides : --this.index;
    this.scrollTo(this.index);
  }

  scrollRight() {
    this.index = this.index == this.countSlides ? 1 : ++this.index;
    this.scrollTo(this.index);
  }

  eventHandler(evt) {
    let { type } = evt.target.dataset;
    switch (type) {
      case "arrow": {
        if (evt.target.dataset.arrow == "left") this.scrollLeft();
        else this.scrollRight();
        break;
      }
      case "trail": {
        this.index = +evt.target.dataset.trail;
        this.scrollTo(+evt.target.dataset.trail);
        break;
      }
    }
  }
  eventHandler = this.eventHandler.bind(this);

  scrollTo(slideNumber) {
    let slider = this.$sliderMain.querySelector(".slider");
    slider.style.left = `${-(this.index - 1) * 100}%`;
    this.#setActiveElement();
  }

  destroy() {
    this.$sliderMain.removeEventListener("click", this.eventHandler);
    clearInterval(this.interval);
    this.$sliderMain.innerHTML = "";
  }
}
