$(document).ready(function() {
  AOS.init();
  $('.stapler').paroller();
  $('#contacts .clip').paroller();

  localStorage.removeItem('quiz');

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

      $(`${id} .object-slider__slide`).slick(
        !status ? bigCloned : 'setPosition'
      );
      $(`${id} .object-slider__content`).slick(
        !status ? smallCloned : 'setPosition'
      );
    });
  }

  // tabs

  $('.object-tabs').tabs();
  $('#contacts .wrapper').tabs({ active: 0 });

  $('.work-time-tabs').tabs({
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
    galleryGroup('.object-gallery', 1);
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

  $('.modal .icon-close').click(function() {
    $('body').removeClass('hidden');
    $(this)
      .closest('.modal')
      .hide();
  });

  $('.equipment-quiz .icon-close').click(function() {
    $('body').removeClass('hidden');
    $(this)
      .closest('.wrapper')
      .removeClass('quiz-modal-block modal');
  });

  $('.header-top .btn-general').click(function() {
    $('body').addClass('hidden');
    $('#modal-header-discount').css('display', 'flex');
  });

  $('.header-content .header-content-btn').click(function() {
    $('body').addClass('hidden');
    $('#equipment .wrapper').addClass('quiz-modal-block modal');
  });

  $('.furniture-types__calculate').click(function() {
    $('body').addClass('hidden');
    $('#modal-furniture-calculate').css('display', 'flex');
  });

  $('#consultation .consultation-btn .btn-general').click(function() {
    $('body').addClass('hidden');
    $('#modal-consultation-calculate').css('display', 'flex');
  });

  $('#quality .consultation-btn .btn-general').click(function() {
    $('body').addClass('hidden');
    $('#modal-quality-calculate').css('display', 'flex');
  });

  $('#solution .reason-solution').click(function() {
    $('body').addClass('hidden');
    $('#modal-solution-discount').css('display', 'flex');
  });

  $('.copyright a').click(function() {
    $('body').addClass('hidden');
    $('#copyright-modal').css('display', 'flex');
  });

  $('.contacts-preheading').click(function() {
    $('body').addClass('hidden');
    $('#modal-contacts-calculate').css('display', 'flex');
  });

  $('#slider-range').slider({
    max: 6,
    orientation: 'horizontal',
    range: 'min',
    slide: function(event, ui) {
      $('#amount2').html('(' + ui.value + ')');
    },
    change: function(event, ui) {
      let oldState = JSON.parse(localStorage.getItem('quiz')) || {};

      const question = $('.step-3 .equipment-quiz__content-heading')
        .first()
        .text()
        .replace(/\s+/g, ' ')
        .trim();

      if (oldState['step-3']) oldState['step-3'].question = question;
      else oldState['step-3'] = { question };

      localStorage.setItem('quiz', JSON.stringify(oldState));
    }
  });
  $('#amount2').html('(' + $('#slider-range').slider('value') + ')');

  let toggled = false;
  $('#slider-range2').slider({
    min: 10,
    step: 10,
    max: 100,
    orientation: 'horizontal',
    range: 'min',
    slide: function(event, ui) {
      $('#amount3').html('(' + ui.value + ' м<sup>2</sup>)');
    },
    change: function(event, ui) {
      let oldState = JSON.parse(localStorage.getItem('quiz')) || {};

      const question = $('.step-4 .equipment-quiz__content-heading')
        .first()
        .text()
        .replace(/\s+/g, ' ')
        .trim();

      if (oldState['step-4']) oldState['step-4'].question = question;
      else oldState['step-4'] = { question };

      localStorage.setItem('quiz', JSON.stringify(oldState));

      if (toggled) return;
      const stepContainer = $('.step-4');
      const button = stepContainer.find('.equipment__btn button');

      button.removeClass('btn-disabled');
      addEventListenerForButton(button);
      toggled = true;
    }
  });
  $('#amount3').html(
    '(' + $('#slider-range2').slider('value') + ' м<sup>2</sup>)'
  );
});
// var hidden = 0;
// $(document).mouseleave(function() {
//   if (hidden) return;
//   $(this).addClass('hidden');
//   $('#modal-leave-discount').css('display', 'flex');
//   hidden = 1;
// });

// object galleries

// function galleryGroup(elem, count) {
//   for (let i = 1; i <= count; i++) {
//     $(`${elem}${i}`).EZView();
//   }
// }

// galleryGroup('.object-gallery', 1);

$(`.object-gallery1`).EZView();
$(`.object-gallery2`).EZView();
$(`.object-gallery3`).EZView();
$(`.object-gallery4`).EZView();

// feedback sliders

function slidersMoreInit(name, count) {
  for (let i = 1; i <= count; i++) {
    $(`${name}-${i}`).slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      prevArrow: null,
      fade: true,
      nextArrow: $(`${name}-${i} + .feedback-slider__img-more`)
    });

    $(`${name}-${i} img`).EZView();
    $(`${name}-${i}`)
      .closest('.feedback-slider__slide-container')
      .find('.feedback-slider__footer img')
      .EZView();
  }
}

slidersMoreInit('.slider-more', 3);
