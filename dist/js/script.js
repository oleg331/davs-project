$(document).ready(function() {
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

      $(`${id} .object-slider__slide`).slick(
        !status ? bigCloned : 'setPosition'
      );
      $(`${id} .object-slider__content`).slick(
        !status ? smallCloned : 'setPosition'
      );
    });
  }

  function removeUIStyles(elem) {
    $(elem).tabs();
    $(`${elem}, ${elem} *`).removeClass(
      'ui-widget ui-widget-content ui-widget-header ui-tabs-panel ui-tabs-anchor ui-tabs-nav ui-state-default ui-state-active ui-state-hover ui-corner-top'
    );
  }

  // tabs

  $('.object-tabs').tabs();
  $('#contacts .wrapper').tabs({ active: 0 });

  $('.work-time-tabs').tabs({
    active: 0
  });

  // removeUIStyles('.object-tabs');
  // removeUIStyles('#contacts .wrapper');
  // removeUIStyles('.work-time-tabs');

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

  $('.modal .icon-close').click(function() {
    $('body').removeClass('hidden');
    $(this)
      .closest('.modal')
      .hide();
  });

  $('.header-top .btn-general').click(function() {
    $('body').addClass('hidden');
    $('#modal-header-discount').css('display', 'flex');
  });

  $('.header-info .btn-general').click(function() {
    $('body').addClass('hidden');
    $('#modal-header-calculate').css('display', 'flex');
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

  $('#slider-range').slider({
    max: 6,
    orientation: 'horizontal',
    range: 'min',
    slide: function(event, ui) {
      $('#amount2').html('(' + ui.value + ')');
    }
  });
  $('#amount2').html('(' + $('#slider-range').slider('value') + ')');

  $('#slider-range2').slider({
    min: 10,
    step: 10,
    max: 100,
    orientation: 'horizontal',
    range: 'min',
    slide: function(event, ui) {
      $('#amount3').html('(' + ui.value + ' м<sup>2</sup>)');
    }
  });
  $('#amount3').html(
    '(' + $('#slider-range2').slider('value') + ' м<sup>2</sup>)'
  );
});
