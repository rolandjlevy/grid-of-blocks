const $ = (elem) => document.querySelector(elem);

const createElem = (tagName, props = {}) => {
  const el = document.createElement(tagName);
  return Object.assign(el, props);
};

const size = 5;

const matrix = Array(size * size).fill({});

$('.grid-container').style.gridTemplateColumns = `repeat(${size}, 1fr)`;
$('.grid-container').style.gridTemplateRows = `repeat(${size}, 1fr)`;

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

const randItemNum = getRandomNum(size * size);

$(`#item_${randItemNum}`).classList.add('active');
