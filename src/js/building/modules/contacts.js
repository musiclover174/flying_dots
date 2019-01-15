export default class Contacts {
  constructor(mapId) {
    this.el = document.querySelector('.js-contacts-map');
    this.mapId = mapId;
  }

  init() {
    const t = this;

    function mapInit() {
      const pinCoord = t.el.getAttribute('data-coords').split(', ');

      const myMap = new ymaps.Map(t.mapId, {
        center: [parseFloat(pinCoord[0]), parseFloat(pinCoord[1])],
        zoom: window.innerWidth <= 1000 ? 15 : 17,
        controls: ['smallMapDefaultSet']
      });

      const PMitem = new ymaps.Placemark([parseFloat(pinCoord[0]), parseFloat(pinCoord[1])], {}, {
        iconLayout: 'default#image',
        iconImageSize: [54, 67],
        iconImageHref: '/static/i/pin.png',
        iconImageOffset: [-32, -42],
      });

      myMap.behaviors.disable('scrollZoom');
      myMap.geoObjects.add(PMitem);
    }

    ymaps.ready(mapInit);
  }
}
