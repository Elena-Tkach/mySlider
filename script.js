const track = document.querySelector('.js-sliders');
const container = document.querySelector('.js-slider-container');
const btnsContainer = document.querySelector('.js-btns');
const btnPrev = document.querySelector('.js-btn-prev');
const btnNext = document.querySelector('.js-btn-next');


let position = 0;
const itemsCount = 10;
const slidesToSchow = 2;
const slidesToScroll = 2;

//получаем ширину каждого элемента видного в окне
const itemWidth = container.clientWidth / slidesToSchow;
const movePosition = slidesToScroll * itemWidth;

const createItem = (item) => {
  const template = document.querySelector('#template-slide');
  const cloneTemplate = template.content.cloneNode(true);

  const itemTitle = cloneTemplate.querySelector('.js-item-title');
  itemTitle.textContent = `${item}`;
  return cloneTemplate;
}

const renderItem = (itemsCount) => {
  for (let i = 1; i <= itemsCount; i++) {
    const item = createItem(i);
    track.append(item);
  }
}

//присваеваем эту ширину слайду
const giveWidthSlides = () => {
  const items = document.querySelectorAll('.js-slide');
  items.forEach((item) => {
    item.style.cssText = `min-width:${itemWidth}px;`;
  })
}



renderItem(itemsCount);
giveWidthSlides();



btnPrev.addEventListener('click', () => {
  const itemsLeft = Math.abs(position) / itemWidth;
  position += itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth;
  setPosition();
  checkBtns();
})

btnNext.addEventListener('click', () => {
  const itemsLeft = itemsCount - (Math.abs(position) + slidesToSchow * itemWidth) / itemWidth;
  position -= itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth;
  setPosition();
  checkBtns();
})


const setPosition = () => {
  track.style.transform = `translateX(${position}px)`;
}

const checkBtns = () => {
  //количество слайдом - количество видимых слайдом * на ширину слайда
  btnPrev.disabled = position >= 0;

  btnNext.disabled = position <= -(itemsCount - slidesToSchow) * itemWidth;

}

checkBtns();





