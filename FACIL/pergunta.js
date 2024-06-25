// declaração de variáveis
const question = document.querySelector('#question');
const answerBox = document.querySelector('#answers-box');
const quizzContainer = document.querySelector('#quizz-container');
const scoreContainer = document.querySelector('#score-container');
const backToStartContainer = document.querySelector('#back-to-start-container');
const letters = ['a', 'b', 'c', 'd', 'e'];
let points = 0;
let actualQuestion = 0;

// perguntas
const questions = [
  {
    question: 'Qual destas áreas estuda os processos vitais dos organismos?',
    answers: [
      { answer: 'Biologia', correct: true },
      { answer: 'Química', correct: false },
      { answer: 'Física', correct: false },
      { answer: 'Geografia', correct: false }
    ]
  },
  {
    question: 'Qual das seguintes teorias sugere que a vida na Terra surgiu de moléculas orgânicas complexas que se formaram em condições primitivas da Terra?',
    answers: [
      { answer: 'Criacionismo', correct: false },
      { answer: 'Abiogênese', correct: true },
      { answer: 'Geração espontânea', correct: false },
      { answer: 'Panspermia', correct: false }
    ]
  },
  {
    question: 'Qual das seguintes relações é uma forma de interação em que ambos os organismos se beneficiam?',
    answers: [
      { answer: 'Mutualismo', correct: true },
      { answer: 'Predação', correct: false },
      { answer: 'Parasitismo', correct: false },
      { answer: 'Comensalismo', correct: false }
    ]
  },
  {
    question: ' Qual das seguintes organelas é responsável pela produção de energia na forma de ATP em uma célula?',
    answers: [
      { answer: 'Complexo de Golgi', correct: false },
      { answer: 'Cloroplasto', correct: false  },
      { answer: 'Mitocôndria', correct: true},
      { answer: 'Lisossomo ', correct: false }
    ]
  },
  {
    question: 'Qual das seguintes macromoléculas é responsável pelo armazenamento de informações genéticas em uma célula?',
    answers: [
      { answer: 'Proteínas', correct: false },
      { answer: 'Lipídeos', correct: false },
      { answer: 'Carboidratos', correct: false },
      { answer: 'Ácidos nucleicos', correct: true  }
    ]
  },
  {
    question: 'Qual dos seguintes processos de transporte celular não requer gasto de energia??',
    answers: [
      { answer: 'Difusão facilitada ', correct: false },
      { answer: 'Transporte passivo', correct: true },
      { answer: 'Transporte ativo ', correct: false },
      { answer: 'Osmose ', correct: false }
    ]
  },
  {
    question: 'assinale a alternativa que contém o agente mínimo que um corpo deve conter para ser considerado vivente.',
    answers: [
      { answer: 'Sangue', correct: false },
      { answer: 'Osso', correct: false },
      { answer: 'Célula', correct: true },
      { answer: 'Hormônio', correct: false }
    ]
  }
];

// substituição do quizz para a primeira pergunta
function init() {
  // criar primeira pergunta
  createQuestion(0);
}

// cria uma pergunta
function createQuestion(i) {
  // limpar questão anterior
  const oldButtons = answerBox.querySelectorAll('button');
  oldButtons.forEach(btn => btn.remove());

  // alterar texto da pergunta
  const questionText = question.querySelector('#question-text');
  const questionNumber = question.querySelector('#question-number');

  questionText.textContent = questions[i].question;
  questionNumber.textContent = i + 1;

  // inserir alternativas
  questions[i].answers.forEach((answer, index) => {
    // cria template botão quizz
    const answerTemplate = document.querySelector('.answer-template').cloneNode(true);

    const letterBtn = answerTemplate.querySelector('.btn-letter');
    const answerText = answerTemplate.querySelector('.question-answer');

    letterBtn.textContent = letters[index];
    answerText.textContent = answer.answer;

    answerTemplate.setAttribute('correct-answer', answer.correct);

    // remover hide e template class
    answerTemplate.classList.remove('hide');
    answerTemplate.classList.remove('answer-template');

    // inserir alternativa na tela
    answerBox.appendChild(answerTemplate);

    // inserir evento click no botão
    answerTemplate.addEventListener('click', function() {
      checkAnswer(this);
    });
  });

  // incrementar o número da questão
  actualQuestion++;
}

// verificar resposta do usuário
function checkAnswer(btn) {
  // seleciona todos os botões
  const buttons = answerBox.querySelectorAll('button');

  // verifica se resposta correta e add classe
  buttons.forEach(button => {
    if (button.getAttribute('correct-answer') === 'true') {
      button.classList.add('correct-answer');

      // checa se usuário acertou a pergunta
      if (btn === button) {
        // incremento dos pontos
        points++;
      }
    } else {
      button.classList.add('wrong-answer');
    }
  });

  // exibir próxima pergunta
  nextQuestion();
}

// exibe a próxima pergunta no quizz
function nextQuestion() {
  // timer para usuário ver as respostas
  setTimeout(() => {
    // verifica se ainda há perguntas
    if (actualQuestion >= questions.length) {
      // apresenta mensagem de sucesso
      showSuccessMessage();
      return;
    }

    createQuestion(actualQuestion);
  }, 1200);
}

// exibe a tela final
function showSuccessMessage() {
  hideOrShowQuizz();

  // calcular score
  const score = ((points / questions.length) * 100).toFixed(2);

  //alterar o número de perguntas corretas
  const correctAnswers = document.querySelector('#correct-answers');
  correctAnswers.textContent = points;

  // alterar o total de perguntas
  const totalQuestions = document.querySelector('#questions-qty');
  totalQuestions.textContent = questions.length;

  // exibir pontuação final
  const displayScore = document.querySelector('#display-score span');
  displayScore.textContent = score.toString();

  // mostrar o botão "Voltar para o início"
  backToStartContainer.classList.remove('hide');
}

// mostra ou esconde o score
function hideOrShowQuizz() {
  quizzContainer.classList.toggle('hide');
  scoreContainer.classList.toggle('hide');
}

// reiniciar quizz
const restartBtn = document.querySelector('#restart');
restartBtn.addEventListener('click', () => {
  // zerar jogo
  actualQuestion = 0;
  points = 0;
  hideOrShowQuizz();
  init();
});

// inicialização do quizz
init();
