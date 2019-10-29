// slider

const bigSliderOptions = {
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  prevArrow: $('.object-slider__arrow.arrow-prev'),
  nextArrow: $('.object-slider__arrow.arrow-next'),
  asNavFor: '.object-slider__content'
};

const smallSliderOptions = {
  slidesToShow: 3,
  slidesToScroll: 1,
  asNavFor: '.object-slider__slide',
  dots: false,
  arrows: false,
  centerMode: true,
  centerPadding: '0',
  focusOnSelect: true
};

const slidersArray = ['#cabinet', '#relax', '#meeting', '#work'];

// slidersInit(bigSliderOptions, smallSliderOptions, slidersArray);

function slidersInit(big, small, id) {
  //   sliders.forEach(id => {
  big.prevArrow = $(`${id} .object-slider__arrow.arrow-prev`);
  big.nextArrow = $(`${id} .object-slider__arrow.arrow-next`);
  big.asNavFor = `${id} ${big.asNavFor}`;
  small.asNavFor = `${id} ${big.asNavFor}`;

  $(`${id} .object-slider__slide`).slick(big);
  $(`${id} .object-slider__content`).slick(small);
  //   });
}

$('.object-tabs').tabs();

slidersInit(
  bigSliderOptions,
  smallSliderOptions,
  $('.object-tabs-heading:first-child a').attr('href')
);

$('.object-list-item a').on('click', function() {
  const id = $(this).attr('href');
  slidersInit(bigSliderOptions, smallSliderOptions, id);
  //   $(`${id} .object-slider__slide`).css('display', 'block');
  //   $(`${id} .object-slider__content`).css('display', 'block');
  //   $(`${id} .object-slider__slide`)
  //     .get(0)
  //     .slick.setPosition();
  //   $(`${id} .object-slider__content`)
  //     .get(0)
  //     .slick.setPosition();
});

// solutions

$(`.slider-solution__container`).slick({
  slidesToShow: 1,
  slidesToScroll: 1
});
