export default class Sticky {
  constructor(topSpacing, bottomSpacing) {
    this.ts = topSpacing;
    this.bs = bottomSpacing;
    this.init();
  }

  init() {
    const sidebar = new StickySidebar('.js-sticky', {
      containerSelector: '.js-sticky-parent',
      innerWrapperSelector: '.js-sticky-inner',
      topSpacing: this.ts,
      bottomSpacing: this.bs,
    });
  }
}
