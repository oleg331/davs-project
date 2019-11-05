function addEventListenerForButton(btn) {
  btn.click(function() {
    const id = $(this).data('to');
    $('.equipment-quiz__container').removeClass('active-slide');
    $(`.equipment-quiz__step`).removeClass('completed');
    $(`.equipment-quiz__step:lt(${id})`).addClass('completed');
    $(`.step-${id}`).addClass('active-slide');

    const buttonPrev = $('.equipment-quiz__container.active-slide').find(
      '.equipment__btn .btn-prev'
    );
    addEventListenerForButton(buttonPrev, true);

    $('.equipment-quiz__count i').html(8 - id);

    if (id === 8) {
      $('.equipment-quiz').addClass('last-step');
    }
  });
}

let triggerGlobal = true;
$('.equipment-quiz__content-option').click(function() {
  const stepContainer = $(this).closest('.equipment-quiz__container');

  const containerClassList = stepContainer.attr('class').split(' ');
  let stepName = '';

  containerClassList.forEach(cl => {
    if (cl.indexOf('step') === 0) {
      stepName = cl;
    }
  });

  const question = stepContainer
    .find('.equipment-quiz__content-heading')
    .first()
    .text()
    .replace(/\s+/g, ' ')
    .trim();

  const answer = $(this)
    .find('span')
    .text();

  const oldState = JSON.parse(localStorage.getItem('quiz')) || {};
  let newState = oldState;

  if (stepName === 'step-6' || stepName === 'step-7') {
    if (triggerGlobal) {
      triggerGlobal = false;
      return;
    }

    let answers = [];

    if (oldState[stepName] && oldState[stepName].answers) {
      answers = newState[stepName].answers;
      let index = answers.indexOf(answer);

      if (index > -1) answers.splice(index, 1);
      else answers.push(answer);
    } else {
      answers.push(answer);
    }

    newState = {
      ...oldState,
      [stepName]: {
        question,
        answers
      }
    };

    triggerGlobal = !triggerGlobal;
  } else {
    newState = {
      ...oldState,
      [stepName]: {
        question,
        answer
      }
    };
  }
  localStorage.setItem('quiz', JSON.stringify(newState));

  const button = stepContainer.find('.equipment__btn button:not(.btn-prev)');
  button.removeClass('btn-disabled');

  addEventListenerForButton(button, stepContainer);
});
