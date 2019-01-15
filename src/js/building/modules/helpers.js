function loadImages(paths, whenLoaded) {
  const imgs = [];
  paths.forEach((path) => {
    const img = new Image();
    img.onload = () => {
      imgs.push(img);
      if (imgs.length === paths.length) whenLoaded(imgs);
    };
    img.src = path;
  });
}

function fillUp(array, max) {
  const { length } = array;
  for (let i = 0; i < max - length; i += 1) {
    array.push(array[Math.floor(Math.random() * length)]);
  }
  return array;
}

function shuffle(array) {
  for (let i = array.length; i; i -= 1) {
    const j = Math.floor(Math.random() * i);
    [array[i - 1], array[j]] = [array[j], array[i - 1]];
  }
  return array;
}

export {
  loadImages,
  fillUp,
  shuffle,
};
