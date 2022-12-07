const track = document.querySelector('.js-sliders');
const items = document.querySelectorAll('.js-slide');
const container = document.querySelector('.js-slider-container');
const btnPrev = document.querySelector('.js-btn-prev');
const btnNext = document.querySelector('.js-btn-next');
let position = 0;
const slidesToSchow = 3;
const slidesToScroll = 2;
const itemsCount = items.length;
//получаем ширину каждого элемента видного в окне
const itemWidth = container.clientWidth / slidesToSchow;
const movePosition = slidesToScroll * itemWidth;

//присваеваем эту ширину слайду 
items.forEach((item) => {
  item.style.cssText = `min-width:${itemWidth}px;`;
})

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
  console.log(position);
  btnNext.disabled = position <= -(itemsCount - slidesToSchow) * itemWidth;

}
checkBtns();
