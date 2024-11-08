document.addEventListener('DOMContentLoaded', () => {
  const $ = (elem) => document.querySelector(elem);

  const createElem = (tagName, props = {}) => {
    const el = document.createElement(tagName);
    return Object.assign(el, props);
  };

  const getSearchParamValue = (key) => {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    return Number(params.get(key));
  };

  const DEFAULT_SIZE = 10;
  const size = getSearchParamValue('size') || DEFAULT_SIZE;
  const maxSize = size * size;

  $('.grid-container').style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  $('.grid-container').style.gridTemplateRows = `repeat(${size}, 1fr)`;

  const matrix = Array(maxSize).fill({});

  matrix.forEach((_, index) => {
    const gridItemProps = {
      className: 'grid-item',
      textContent: index + 1,
      id: `item_${index + 1}`,
    };
    const gridItem = createElem('div', gridItemProps);
    $('.grid-container').appendChild(gridItem);
  });

  const getRandomNum = (max) => Math.floor(Math.random() * max) + 1;

  const getNextPos = (direction, i) => {
    const sizePlus = i + size;
    const sizeMinus = i - size;
    const nextPos = {
      ArrowUp: sizeMinus < 0 ? null : sizeMinus,
      ArrowDown: sizePlus >= maxSize ? null : sizePlus,
      ArrowLeft: i % size === 0 ? null : i - 1,
      ArrowRight: (i + 1) % (size === 0) ? null : i + 1,
    };
    return nextPos[direction] || null;
  };

  const moveBlock = (direction) => {
    const activeItem = $('.active');
    const [indexString] = activeItem.id.match(/\d+/);
    const index = Number(indexString) - 1;
    const nextItemIndex = getNextPos(direction, index);
    if (nextItemIndex !== null) {
      activeItem.classList.remove('active');
      $(`#item_${nextItemIndex + 1}`).classList.add('active');
    }
  };

  document.addEventListener('keydown', (e) => {
    moveBlock(e.key);
  });

  const highlightRandomItem = () => {
    const randItemNum = String(getRandomNum(maxSize));
    $('.active')?.classList.remove('active');
    $(`#item_${randItemNum}`).classList.add('active');
  };

  highlightRandomItem();
});
