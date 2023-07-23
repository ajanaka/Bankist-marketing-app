'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const section1 = document.querySelector('#section--1');
const section2 = document.querySelector('#section--2');
const header = document.querySelector('.header');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section = document.querySelectorAll('.section');
let curSlide = 0;
const slider = document.querySelector('.slider');
const allSlide = document.querySelectorAll('.slide');
const rightBtn = document.querySelector('.slider__btn--right');
const leftBtn = document.querySelector('.slider__btn--left');
const maxSlide = allSlide.length;
const dotContainer = document.querySelector('.dots');
const nav = document.querySelector('.nav');
const allSection = document.querySelectorAll('.section');
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);
btnCloseModal.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
btnScrollTo.addEventListener('click', function (e) {
  e.preventDefault();
  section1.scrollIntoView({ behavior: 'smooth' });
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');

    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }

  // click.scrollIntoView({ behavior: 'smooth' });
});

const hourOver = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;

    const sibbling = link.closest('nav').querySelectorAll('.nav__link');

    const img = link.closest('.nav').querySelector('img');

    sibbling.forEach(el => {
      if (el !== link) {
        el.style.opacity = this;
        img.style.opacity = this;
      }
    });
  }
};
nav.addEventListener('mouseover', hourOver.bind(0.5));
nav.addEventListener('mouseout', hourOver.bind(1));

const tabContainer = document.querySelector('.operations__tab-container');
const contant = document.querySelectorAll('.operations__content');
const tab = document.querySelectorAll('.operations__tab');

tabContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  console.log(clicked);
  tab.forEach(function (tab) {
    tab.classList.remove('operations__tab--active');
  });
  if (!clicked) return;
  clicked.classList.add('operations__tab--active');
  contant.forEach(c => c.classList.remove('operations__content--active'));
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});
const navHight = nav.getBoundingClientRect().height;

const navRetriview = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};
const headerObserver = new IntersectionObserver(navRetriview, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHight}px`,
});
headerObserver.observe(header);

const sectionRetrivew = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');

  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(sectionRetrivew, {
  root: null,
  threshold: 0.1,
});
allSection.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

//lazy loading images
const imgTargets = document.querySelectorAll(`img[data-src]`);

const loadImg = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});
imgTargets.forEach(function (img) {
  imgObserver.observe(img);
});

//slidding

// slider.style.transform = `scale(0.3) translateX(-700px) `;
// slider.style.overflow = 'visible';

const creatDots = function () {
  allSlide.forEach(function (_, i) {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};

const activeDotes = function (slide) {
  document
    .querySelectorAll('.dots__dot')
    .forEach(dot => dot.classList.remove('dots__dot--active'));
  document
    .querySelector(`.dots__dot[data-slide='${slide}']`)
    .classList.add('dots__dot--active');
};

const goToSlide = function (slide) {
  allSlide.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};

const nextSlide = function () {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  goToSlide(curSlide);
  activeDotes(curSlide);
};
const priviousSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }

  goToSlide(curSlide);
  activeDotes(curSlide);
};

//init
const init = function () {
  creatDots();
  activeDotes(0);
  goToSlide(0);
};
init();
//event lisners
rightBtn.addEventListener('click', nextSlide);
leftBtn.addEventListener('click', priviousSlide);

document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowRight') nextSlide();
  if (e.key === 'ArrowLeft') priviousSlide();
});

//create dots

dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const slide = e.target.dataset.slide;
    goToSlide(slide);
    activeDotes(slide);
  }
});

// btnScrollTo.addEventListener('click', function () {
//   section1.scrollIntoView({ behavior: 'smooth' });
// });
// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   e.preventDefault();

//   if (e.target.classList.contains('nav__link')) {
//     const id = e.target.getAttribute('href');
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   }
// });
// //tab
// const tabContainer = document.querySelector('.operations__tab-container');
// const tab = document.querySelectorAll('.operations__tab');
// const tabContent = document.querySelectorAll('.operations__content');

// tabContainer.addEventListener('click', function (e) {
//   const clicked = e.target.closest('.operations__tab');
//   tab.forEach(t => t.classList.remove('operations__tab--active'));
//   if (!clicked) return;

//   clicked.classList.add('operations__tab--active');
//   tabContent.forEach(c => c.classList.remove('operations__content--active'));
//   document
//     .querySelector(`.operations__content--${clicked.dataset.tab}`)
//     .classList.add('operations__content--active');
// });

// //menu fade animation
// const nav = document.querySelector('.nav');
// const hourOver = function (e) {
//   if (e.target.classList.contains('nav__link')) {
//     const link = e.target;

//     const sibbling = link.closest('.nav').querySelectorAll('.nav__link');
//     const logo = link.closest('.nav').querySelector('img');
//     sibbling.forEach(el => {
//       if (el !== link) {
//         el.style.opacity = this;
//         logo.style.opacity = this;
//       }
//     });
//   }
// };
// nav.addEventListener('mouseover', hourOver.bind(0.5));
// nav.addEventListener('mouseout', hourOver.bind(1));
// const navHight = nav.getBoundingClientRect().height;
// const stickyNav = function (entries, observe) {
//   const [entry] = entries;

//   if (!entry.isIntersecting) {
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//   }
// };

// const headerObserver = new IntersectionObserver(stickyNav, {
//   root: null,
//   threshold: 0,
//   rootMargin: `-${navHight}px`,
// });
// headerObserver.observe(header);
// const allSection = document.querySelectorAll('.section');
// const sectionReveal = function (entries, observe) {
//   const [entry] = entries;

//   if (!entry.isIntersecting) return;
//   entry.target.classList.remove('section--hidden');
//   observe.unobserve(entry.target);
// };
// const sectionObserver = new IntersectionObserver(sectionReveal, {
//   root: null,
//   threshold: 0.15,
// });
// allSection.forEach(section => {
//   sectionObserver.observe(section);
//   // section.classList.add('section--hidden');
// });
// const allImag = document.querySelectorAll('img[data-src]');
// const loadImg = function (entries, observer) {
//   const [entry] = entries;
//   console.log(entry);
//   if (!entry.isIntersecting) return;
//   entry.target.src = entry.target.dataset.src;
//   entry.target.addEventListener('load', function () {
//     entry.target.classList.remove('lazy-img');
//   });
//   observer.unobserve(entry.target);
// };
// const imgObserver = new IntersectionObserver(loadImg, {
//   root: null,
//   threshold: 0,
//   rootMargin: '200px',
// });
// allImag.forEach(img => imgObserver.observe(img));

// //slider
// const slider = function () {
//   let curSlide = 0;
//   const slide = document.querySelectorAll('.slide');

//   // slider.style.transform = `translateX(-400px) scale(0.5) `;
//   // slider.style.overflow = 'visible';
//   const leftBtn = document.querySelector('.slider__btn--left');
//   const rightBtn = document.querySelector('.slider__btn--right');
//   const dotContainer = document.querySelector('.dots');
//   const maxSlide = slide.length;

//   //functions
//   const creatDots = function () {
//     slide.forEach(function (_, i) {
//       dotContainer.insertAdjacentHTML(
//         'beforeend',
//         `<button class="dots__dot" data-slide="${i}"></button>`
//       );
//     });
//   };

//   const acivatDots = function (slid) {
//     document
//       .querySelectorAll('.dots__dot')
//       .forEach(dot => dot.classList.remove('dots__dot--active'));
//     document
//       .querySelector(`.dots__dot[data-slide="${slid}"]`)
//       .classList.add('dots__dot--active');
//   };

//   const goToSlide = function (slid) {
//     slide.forEach(
//       (s, i) => (s.style.transform = `translateX(${100 * (i - slid)}%)`)
//     );
//   };

//   const nextSlide = function () {
//     if (curSlide === maxSlide - 1) {
//       curSlide = 0;
//     } else {
//       curSlide++;
//     }
//     goToSlide(curSlide);
//     acivatDots(curSlide);
//   };
//   const priviousSlide = function () {
//     if (curSlide === 0) {
//       curSlide = maxSlide - 1;
//     } else {
//       curSlide--;
//     }

//     goToSlide(curSlide);
//     acivatDots(curSlide);
//   };
//   const init = function () {
//     creatDots();
//     acivatDots(0);
//     goToSlide(0);
//   };
//   init();
//   //event haddlers
//   rightBtn.addEventListener('click', nextSlide);
//   leftBtn.addEventListener('click', priviousSlide);

//   document.addEventListener('keydown', function (e) {
//     console.log(e);
//     if (e.key === 'ArrowRight') nextSlide();
//     if (e.key === 'ArrowLeft') priviousSlide();
//   });

//   dotContainer.addEventListener('click', function (e) {
//     if (e.target.classList.contains('dots__dot')) {
//       const slide = e.target.dataset.slide;
//       goToSlide(slide);
//       acivatDots(slide);
//     }
//   });
// };
// slider();

// document.addEventListener('DOMContentLoaded', function (e) {
//   console.log('HTML parsed and DOM tree built!', e);
// });

// window.addEventListener('beforeunload', function (e) {
//   e.preventDefault();
//   console.log(e);
//   e.returnValue = '';
// });
// const allImag = document.querySelectorAll(`img[data-src]`);

// const loadImg = function (entries, observer) {
//   const [entry] = entries;
//   console.log(entry);
//   if (!entry.isIntersecting) return;
//   //replace src with Data-src
//   entry.target.src = entry.target.dataset.src;

//   entry.target.addEventListener('load', function () {
//     entry.target.classList.remove('lazy-img');
//   });
//   observer.unobserve(entry.target);
// };

// const imgObserver = new IntersectionObserver(loadImg, {
//   root: null,
//   threshold: 0,
//   rootMargin: '200px',
// });
// allImag.forEach(img => imgObserver.observe(img));

// const navHight = nav.getBoundingClientRect().height;
// console.log(navHight);
// const stickyNav = function (entries, observe) {
//   const [entry] = entries;
//   console.log(entry);
//   if (!entry.isIntersecting) {
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//   }
// };
// const headerObserver = new IntersectionObserver(stickyNav, {
//   root: null,
//   threshold: 0,
//   rootMargin: `-${navHight}px`,
// });
// headerObserver.observe(header);

// const obsCallBack = function (entries, observe) {
//   entries.forEach(entry => {
//     if (!entry.isIntersection) {
//       nav.classList.add('sticky');
//     }
//   });
// };
// const obsOption = {
//   root: null,
//   threshold: [0],
// };

// const observer = new IntersectionObserver(obsCallBack, obsOption);
// observer.observe(header);
// const initiate = section1.getBoundingClientRect();
// console.log(initiate);
// window.addEventListener('scroll', function () {
//   if (window.scrollY > initiate.top) nav.classList.add('sticky');
//   else {
//     nav.classList.remove('sticky');
//   }
// });

// const hourOver = function (e) {
//   if (e.target.classList.contains('nav__link')) {
//     const link = e.target;

//     const sibbling = link.closest('.nav').querySelectorAll('.nav__link');
//     const logo = link.closest('.nav').querySelector('img');

//     sibbling.forEach(el => {
//       if (el !== e.target) el.style.opacity = this;
//     });
//     logo.style.opacity = this;
//   }
// };
// const nav = document.querySelector('.nav');
// nav.addEventListener('mouseover', hourOver.bind(0.5));

// nav.addEventListener('mouseout', hourOver.bind(1));

// const tab = document.querySelectorAll('.operations__tab');
// const tabContainer = document.querySelector('.operations__tab-container');
// const tabContent = document.querySelectorAll('.operations__content');
// tabContainer.addEventListener('click', function (e) {
//   const click = e.target.closest('.operations__tab');
//   //guard clause
//   if (!click) return;
//   //remove tab
//   tab.forEach(function (t) {
//     t.classList.remove('operations__tab--active');
//   });
//   //activate tab
//   click.classList.add('operations__tab--active');

//   //remove content area
//   tabContent.forEach(c => c.classList.remove('operations__content--active'));
//   //active content area
//   document
//     .querySelector(`.operations__content--${click.dataset.tab}`)

//     .classList.add('operations__content--active');
// });
//going downward

// console.log(h1.querySelectorAll('.highlight'));
// console.log(h1.childNodes);
// console.log(h1.children);
// h1.firstElementChild.style.color = 'red';
// h1.lastElementChild.style.color = 'red';

//going upward

// console.log(h1.parentNode);
// console.log(h1.parentElement);
// h1.closest('.header').style.background = 'var(--gradient-secondary)';
//going side ways

// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);
// console.log(h1.parentElement.children);
// [...h1.parentElement.children].forEach(function (el) {
//   if (el !== h1) el.style.transform = `scale(0.5)`;
// });
// const id = document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

// const h1 = document.querySelector('h1');
// const alerth1 = function (e) {
//   alert('your reading now h1');
// };

// h1.addEventListener('mouseenter', alerth1);

// setTimeout(() => {
//   h1.removeEventListener('mouseenter', alerth1);
// }, 3000);

// const randomInt = (max, min) =>
//   Math.floor(Math.random() * (max - min + 1) + min);
// const randomColor = () =>
//   `rgb(${randomInt(255, 0)},${randomInt(255, 0)},${randomInt(255, 0)})`;

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('link', e.target, e.currentTarget);
//   console.log(e.currentTarget === this);
// });
// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('CONTAINER', e.target, e.currentTarget);
// });
// document.querySelector('.nav').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('NAV', e.target, e.currentTarget);
// });

// const massage = document.createElement('div');
// massage.classList.add('cookie-message');
// // massage.textContent = `we use cookied for improved functionality and analytics`;
// massage.innerHTML = `we use cookied for improved functionality and analytics,<button class= 'btn btn--close-cookie'>got it!</button>`;
// // header.append(massage);
// // header.append(massage.cloneNode(true));
// header.prepend(massage);

// //delete the element
// document
//   .querySelector('.btn--close-cookie')
//   .addEventListener('click', function () {
//     massage.remove();
//   });

// massage.style.backgroundColor = '#37383d';
// massage.style.width = '120%';
// console.log(getComputedStyle(massage).height);

// massage.style.height =
//   Number.parseFloat(getComputedStyle(massage).height, 10) + 30 + 'px';

// document.documentElement.style.setProperty('--color-primary', 'orangered');

// const logo = document.querySelector('.nav__logo');
// console.log(logo.src);
// console.log(logo.alt);
// console.log(logo.className);

// console.log(logo.setAttribute('designer', 'ashan'));
// console.log(logo.getAttribute('designer'));
// console.log(logo.dataset.versionNumber);
