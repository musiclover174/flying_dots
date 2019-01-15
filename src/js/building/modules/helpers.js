function fadeIn(elem, ms, cb, d = 'block') {
  if (!elem) return;

  elem.style.opacity = 0;
  elem.style.display = d;

  if (ms) {
    let opacity = 0;
    const timer = setInterval(() => {
      opacity += 50 / ms;
      if (opacity >= 1) {
        clearInterval(timer);
        opacity = 1;
        if (cb) cb()
      }
      elem.style.opacity = opacity;
    }, 50);
  } else {
    elem.style.opacity = 1;
    if (cb) cb();
  }
}

function fadeOut(elem, ms, cb) {
  if (!elem) return;

  elem.style.opacity = 1;

  if (ms) {
    let opacity = 1;
    const timer = setInterval(() => {
      opacity -= 50 / ms;
      if (opacity <= 0) {
        clearInterval(timer);
        opacity = 0;
        elem.style.display = 'none';
        if (cb) cb();
      }
      elem.style.opacity = opacity;
    }, 50);
  } else {
    elem.style.opacity = 0;
    elem.style.display = 'none';
    if (cb) cb();
  }
}

function scrollTo(to, duration) {
  if (duration <= 0) return;
  const element = document.documentElement;
  const difference = to - element.scrollTop;
  const perTick = difference / duration * 10;

  setTimeout(() => {
    element.scrollTop += perTick;
    window.animation.scrollTo(to, duration - 10);
  }, 10);
}

function visChecker(el) {
  const rect = el.getBoundingClientRect();
  const wHeight = window.innerHeight || document.documentElement.clientHeight;
  const wWidth = window.innerWidth || document.documentElement.clientWidth;
  return (
    rect.bottom - el.offsetHeight * 0.35 <= wHeight
    && rect.right <= wWidth
  );
}

function resizeWatcher() {
  const tableSel = document.querySelectorAll('table');
  const scrollArray = [];
  if (tableSel.length) {
    tableSel.forEach((item, i) => {
      const orgHtml = item.outerHTML;

      item.outerHTML = `<div class='table-scroller${i}'>${orgHtml}</div>`;
      const ps = new PerfectScrollbar(`.table-scroller${i}`, {
        wheelPropagation: true,
      });

      scrollArray.push(ps);
    });

    window.addEventListener('resize', () => {
      if (scrollArray.length) {
        scrollArray.forEach((item) => {
          item.update();
        });
      }
    });
  }
}

function elemVisCheck(elArray) {
  window.addEventListener('scroll', () => {
    if (elArray.length) {
      elArray.forEach((item) => {
        if (document.querySelectorAll(item).length) {
          document.querySelectorAll(item).forEach((elem) => {
            if (visChecker(elem)) {
              elem.setAttribute('visible', true)
            }
          });
        }
      });
    }
  });
}

export {
  fadeIn,
  fadeOut,
  scrollTo,
  visChecker,
  resizeWatcher,
  elemVisCheck,
}
