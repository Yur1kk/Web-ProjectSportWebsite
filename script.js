const testData = {
    testName: "Тест по WEB дизайну",
    questions: [
      {
        question: "Коли був заснований футбол?",
        answers: [
          { answer: "1905 рік", isCorrect: false },
          { answer: "1863 рік", isCorrect: true },
          { answer: "1642 рік", isCorrect: false },
          { answer: "1752 рік", isCorrect: false }
        ]
      },
      {
        question: "Вкажіть командний вид спорту",
        answers: [
          { answer: "Волейбол", isCorrect: true },
          { answer: "Плавання", isCorrect: false },
          { answer: "Бокс", isCorrect: false },
          { answer: "Стрільба з лука", isCorrect: false }
        ]
      },
      {
        question: "Скільки гравців зазвичай необхідно в одній команді для гри в футбол",
        answers: [
          { answer: "11", isCorrect: true },
          { answer: "10", isCorrect: false },
          { answer: "12", isCorrect: false },
          { answer: "9", isCorrect: false }
        ]
      },
      {
        question: "Скільки гравців зазвичай необхідно в одній команді для гри в волейбол",
        answers: [
          { answer: "6", isCorrect: true },
          { answer: "5", isCorrect: false },
          { answer: "7", isCorrect: false },
          { answer: "8", isCorrect: false }
        ]
      },
      {
        question: "Скільки хвилин триває раунд в боксі",
        answers: [
          { answer: "3", isCorrect: true },
          { answer: "2", isCorrect: false },
          { answer: "2.30с", isCorrect: false },
          { answer: "4", isCorrect: false }
        ]
      }
    ]
  };
  
  const testContainer = document.getElementById('test-container');
  const submitBtn = document.getElementById('submit-btn');
  const resultDisplay = document.getElementById('result');
  
  function displayQuestions() {
    testData.questions.forEach((q, index) => {
      const questionDiv = document.createElement('div');
      questionDiv.innerHTML = `
        <p>${index + 1}. ${q.question}</p>
        <ul>
          ${q.answers.map(answer => `
            <li>
              <label>
                <input type="radio" name="question${index}" value="${answer.isCorrect}">
                ${answer.answer}
              </label>
            </li>
          `).join('')}
        </ul>
      `;
      testContainer.appendChild(questionDiv);
    });
  }
  
  function calculateResult() {
    let score = 0;
    testData.questions.forEach((q, index) => {
      const selectedAnswer = document.querySelector(`input[name="question${index}"]:checked`);
      if (selectedAnswer && selectedAnswer.value === 'true') {
        score++;
      }
    });
    return score;
  }
  
  submitBtn.addEventListener('click', () => {
    const score = calculateResult();
    resultDisplay.textContent = `Ваш результат: ${score}/${testData.questions.length}`;
  });
  
  displayQuestions();
  