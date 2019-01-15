export default class Burger {
  constructor() {
    this.burgerEl = document.querySelector('.js-burger');
    this.init();
  }

  init() {
    this.burgerEl.addEventListener('click', (e) => {
      document.body.classList.toggle('burgeropen');
      if (this.burgerEl.classList.contains('open')) {
        this.burgerEl.classList.add('remove');
        setTimeout(() => {
          this.burgerEl.classList.remove('open', 'remove');
        }, 1000);
      } else {
        this.burgerEl.classList.add('open');
      }
      e.preventDefault();
    });
  }
}
