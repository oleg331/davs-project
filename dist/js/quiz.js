(function() {
  const myQuestions = [
    {
      question: 'Сколько сотрудников работает в офисе?',
      answers: {
        a: 'до 5 человек',
        b: '10 - 20 человек',
        c: '30 - 50 человек',
        d: '5 - 10 человек',
        e: '20 - 30 человек',
        f: 'от 50 человек'
      },
      correctAnswer: 'c'
    },
    {
      question: '2. Сколько сотрудников работает в офисе?',
      answers: {
        a: 'до 5 человек',
        b: '10 - 20 человек',
        c: '30 - 50 человек',
        d: '5 - 10 человек',
        e: '20 - 30 человек'
      },
      correctAnswer: 'c'
    },
    {
      question: '3. Сколько сотрудников работает в офисе?',
      answers: {
        a: 'до 5 человек',
        b: '10 - 20 человек',
        c: '30 - 50 человек',
        d: '5 - 10 человек',
        e: '20 - 30 человек'
      },
      correctAnswer: 'd'
    },
    {
      question: '4. Сколько сотрудников работает в офисе?',
      answers: {
        a: 'до 5 человек',
        b: '10 - 20 человек',
        c: '30 - 50 человек',
        d: '5 - 10 человек',
        e: '20 - 30 человек'
      },
      correctAnswer: 'd'
    },
    {
      question: '5. Сколько сотрудников работает в офисе?',
      answers: {
        a: 'до 5 человек',
        b: '10 - 20 человек',
        c: '30 - 50 человек',
        d: '5 - 10 человек',
        e: '20 - 30 человек'
      },
      correctAnswer: 'd'
    },
    {
      question: '6. Сколько сотрудников работает в офисе?',
      answers: {
        a: 'до 5 человек',
        b: '10 - 20 человек',
        c: '30 - 50 человек',
        d: '5 - 10 человек',
        e: '20 - 30 человек'
      },
      correctAnswer: 'd'
    },
    {
      question: '7. Сколько сотрудников работает в офисе?',
      answers: {
        a: 'до 5 человек',
        b: '10 - 20 человек',
        c: '30 - 50 человек',
        d: '5 - 10 человек',
        e: '20 - 30 человек'
      },
      correctAnswer: 'd'
    }
  ];

  function buildQuiz() {
    // we'll need a place to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // we'll want to store the list of answer choices
      const answers = [];

      // and for each available answer...
      for (letter in currentQuestion.answers) {
        // ...add an HTML radio button
        answers.push(
          `<label class='equipment-quiz__content-option'>
               <input type="radio" name="question${questionNumber}" value="${letter}">
                ${currentQuestion.answers[letter]}
             </label>`
        );
      }

      // add this question and its answers to the output
      output.push(
        `<div class="equipment-quiz__content-inner">
             <p class="equipment-quiz__content-heading"> ${
               currentQuestion.question
             } </p>
             <div class="equipment-quiz__content-options"> ${answers.join(
               ''
             )} </div>
           </div>`
      );
    });

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join('');
  }

  function showResults(n) {
    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll(
      '.equipment-quiz__content-options'
    );

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `Осталось <i>${myQuestions.length -
      n}</i> вопросов из ${myQuestions.length}`;
  }

  function showSlide(n) {
    if (myQuestions.length === n) {
      const submit = nextButton.querySelector('.btn-content');
      submit.innerHTML = 'Отправить ответы';
      return;
    }
    slides[currentSlide].classList.remove('active-slide');
    slides[n].classList.add('active-slide');
    currentSlide = n;
    showResults(n);

    // if (currentSlide === 0) {
    //   previousButton.style.display = 'none';
    // } else {
    //   previousButton.style.display = 'inline-block';
    // }

    // if (currentSlide === slides.length - 1) {
    //   nextButton.style.display = 'none';
    //   submitButton.style.display = 'inline-block';
    // } else {
    //   nextButton.style.display = 'inline-block';
    //   submitButton.style.display = 'none';
    // }
  }

  function showNextSlide() {
    showSlide(currentSlide + 1);

    options.forEach(option => {
      option.addEventListener('click', function() {
        nextButton.classList.remove('btn-disabled');
        nextButton.addEventListener('click', showNextSlide);
      });
    });

    nextButton.classList.add('btn-disabled');
    nextButton.removeEventListener('click', showNextSlide);
  }

  function showPreviousSlide() {
    showSlide(currentSlide - 1);
  }

  const quizContainer = document.getElementById('equipment-quiz');
  const resultsContainer = document.getElementById('equipment-quiz__count');
  const submitButton = document.getElementById('equipment__btnn');

  // display quiz right away
  buildQuiz();

  //   const previousButton = document.getElementById('previous');
  const nextButton = document.getElementById('equipment__btn');
  const slides = document.querySelectorAll('.equipment-quiz__content-inner');
  let currentSlide = 0;

  showSlide(0);

  // on submit, show results
  //   submitButton.addEventListener('click', showResults);
  //   previousButton.addEventListener('click', showPreviousSlide);

  const options = quizContainer.querySelectorAll(
    '.equipment-quiz__content-option input'
  );

  options.forEach(option => {
    option.addEventListener('click', function() {
      nextButton.classList.remove('btn-disabled');
      nextButton.addEventListener('click', showNextSlide);
    });
  });
})();
