AOS.init();
$('.stapler').paroller();

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

slidersInit(bigSliderOptions, smallSliderOptions, slidersArray);

function slidersInit(big, small, sliders, status = false) {
  sliders.forEach(id => {
    const bigCloned = {
      ...big,
      prevArrow: $(`${id} .object-slider__arrow.arrow-prev`),
      nextArrow: $(`${id} .object-slider__arrow.arrow-next`),
      asNavFor: `${id} ${big.asNavFor}`
    };

    const smallCloned = {
      ...small,
      asNavFor: `${id} ${small.asNavFor}`
    };

    $(`${id} .object-slider__slide`).slick(!status ? bigCloned : 'setPosition');
    $(`${id} .object-slider__content`).slick(
      !status ? smallCloned : 'setPosition'
    );
  });
}

// tabs

$('.object-tabs').tabs();
$('#contacts .wrapper').tabs({ active: 0 });

const workTimeTabs = $('.work-time-tabs').tabs({
  active: 0
});

$('.work-time-tabs-content .btn-content').click(function() {
  const id = $(this)
    .closest('.work-time-tabs-container')
    .attr('id');

  $('.work-time-tabs').tabs({ active: id[4] });
});

$('.object-list-item a').on('click', function() {
  const id = $(this).attr('href');

  // reinit slider
  slidersInit(bigSliderOptions, smallSliderOptions, slidersArray, true);
});

// solutions slider

$(`.slider-solution__container`).slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  prevArrow: $('.slider-solution__arrows .arrow-left'),
  nextArrow: $('.slider-solution__arrows .arrow-right')
});

// feedback slider

$(`.feedback-slider__container`).slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  nextArrow: $('.feedback-slider__arrow-right .arrow-right'),
  prevArrow: null,
  dots: true
});
