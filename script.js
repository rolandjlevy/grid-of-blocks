document.addEventListener('DOMContentLoaded', function () {
  const $ = (elem) => document.querySelector(elem);

  const createElem = (tagName, props = {}) => {
    const el = document.createElement(tagName);
    return Object.assign(el, props);
  };

  const DEFAULT_SIZE = 5;

  const getSize = () => {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    return (sizeParam = params.get('size'));
  };

  const size = getSize() || DEFAULT_SIZE;
  const maxSize = size * size;

  $('.grid-container').style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  $('.grid-container').style.gridTemplateRows = `repeat(${size}, 1fr)`;

  const matrix = Array(maxSize).fill({});

  matrix.forEach((item, index) => {
    const gridItemProps = {
      className: 'grid-item',
      textContent: index + 1,
      id: `item_${index + 1}`,
    };
    const gridItem = createElem('div', gridItemProps);
    $('.grid-container').appendChild(gridItem);
  });

  const getRandomNum = (max) => Math.floor(Math.random() * max) + 1;

  const highlightRandomItem = () => {
    const randItemNum = getRandomNum(maxSize);
    $('.active')?.classList.remove('active');
    $(`#item_${randItemNum}`).classList.add('active');
  };

  highlightRandomItem();

  setInterval(highlightRandomItem, 200);
});
