'use strict';

const initSlider = () => {
  const container = document.querySelector('.js-slider-container');
  const track = document.querySelector('.js-sliders');
  const btnsContainer = document.querySelector('.js-btns');
  const btnPrev = document.querySelector('.js-btn-prev');
  const btnNext = document.querySelector('.js-btn-next');
  const btnsDot = document.querySelector('.js-dots');


  let position = 0;//позиция слайда
  const itemsCount = 10; //общее количество слайдов
  const slidesToSchow = 3; //сколько слайдов показывать
  const slidesToScroll = 2;// сколько слайдов скролить 
  //получаем ширину каждого элемента видного в окне. Ширина контейнера / на кол.видных слайдов
  const itemWidth = container.clientWidth / slidesToSchow;
  const movePosition = slidesToScroll * itemWidth;//Ширина слайдов  которые скролим  
  const dotsCount = Math.ceil(itemsCount / slidesToScroll);//считаем количество дотов


  const createItem = (item) => {
    const template = document.querySelector('#template-slide');
    const cloneTemplate = template.content.cloneNode(true);

    const itemTitle = cloneTemplate.querySelector('.js-item-title');
    itemTitle.textContent = `${item}`;
    return cloneTemplate;
  }

  const createDot = (index) => {
    const template = document.querySelector('#template-dot');
    const cloneTemplate = template.content.cloneNode(true);
    const dot = cloneTemplate.querySelector('.js-dot');
    dot.setAttribute('data-index', `${index}`);
    return cloneTemplate;
  }

  const renderDot = (dotsCount) => {
    for (let i = 1; i <= dotsCount; i++) {
      const dot = createDot(i);
      btnsDot.append(dot);
      if (i === 1) {
        const activeDot = document.querySelector('.js-dot');
        activeDot.classList.add('active');
      }
    }
  }

  const renderItem = (itemsCount) => {
    for (let i = 1; i <= itemsCount; i++) {
      const item = createItem(i);
      track.append(item);
    }
  }

  //присваеваем эту ширину слайдам
  const giveWidthSlides = () => {
    const items = document.querySelectorAll('.js-slide');
    items.forEach((item) => {
      item.style.cssText = `min-width:${itemWidth}px;`;
    })
  }

  //Устанавливаем позицию  контейнеру с слайдами
  const setPosition = () => {
    track.style.transform = `translate3d(${position}px, 0, 0)`;
  }

  //Проверяем конец слайда
  const checkBtns = () => {
    btnPrev.disabled = position >= 0;
    btnNext.disabled = position <= -(itemsCount - slidesToSchow) * itemWidth;
  }

  renderDot(dotsCount);
  renderItem(itemsCount);
  giveWidthSlides();

  btnsDot.addEventListener('click', (event) => {
    if (event.target.closest('.js-dot')) {
      console.log(event.target);
    }
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


  checkBtns();

};

initSlider();




