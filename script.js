const quizData = [
    {
      question: "What is the capital of France?",
      answers: [
        { text: "Paris", correct: true },
        { text: "London", correct: false },
        { text: "Berlin", correct: false },
        { text: "Madrid", correct: false },
      ],
    },
    {
      question: "What is the largest planet in our solar system?",
      answers: [
        { text: "Earth", correct: false },
        { text: "Jupiter", correct: true },
        { text: "Mars", correct: false },
        { text: "Venus", correct: false },
      ],
    },
    {
      question: "What is the highest mountain in the world?",
      answers: [
        { text: "Mount Everest", correct: true },
        { text: "K2", correct: false },
        { text: "Kangchenjunga", correct: false },
        { text: "Lhotse", correct: false },
      ],
    },
  ];
  
  const quizContainer = document.getElementById("quiz");
  const resultContainer = document.getElementById("result");
  const submitForm = document.getElementById("submit-form");
  const startButton = document.getElementById("start");
  const timerElement = document.createElement("div");
  
  let currentQuestion = 0;
  let score = 0;
  let timeLeft = 60;
  let timerId;
  
  function startQuiz() {
    startButton.style.display = "none";
    quizContainer.style.display = "block";
    showQuestion();
    startTimer();
  }
  
  function showQuestion() {
    const question = quizData[currentQuestion];
    const questionText = document.createElement("h2");
    questionText.innerText = question.question;
    quizContainer.appendChild(questionText);
  
    const answerContainer = document.createElement("div");
    answerContainer.classList.add("answer-container");
    question.answers.forEach((answer) => {
      const answerButton = document.createElement("button");
      answerButton.innerText = answer.text;
      answerButton.addEventListener("click", () => {
        if (answer.correct) {
          score++;
          resultContainer.innerText = "Correct!";
          currentQuestion++;
          if (currentQuestion < quizData.length) {
            quizContainer.innerHTML = "";
            showQuestion();
          } else {
            endQuiz();
          }
        } else {
          timeLeft -= 10;
          resultContainer.innerText = "Wrong!";
        }
      });
      answerContainer.appendChild(answerButton);
    });
    quizContainer.appendChild(answerContainer);
  }
  
  function startTimer() {
    timerElement.innerText = "Time left: " + timeLeft;
    document.body.appendChild(timerElement);
    timerId = setInterval(() => {
      timeLeft--;
      timerElement.innerText = "Time left: " + timeLeft;
      if (timeLeft === 0) {
        endQuiz();
      }
    }, 1000);
  }
  
  function endQuiz() {
    clearInterval(timerId);
    quizContainer.style.display = "none";
    resultContainer.innerText = "Your score is " + score;
    submitForm.style.display = "block";
  }
  
  submitForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const initials = document.getElementById("initials").value;
    localStorage.setItem(initials, score);
    alert("Score saved!");
    window.location.reload();
  });
  
  startButton.addEventListener("click", startQuiz);
  