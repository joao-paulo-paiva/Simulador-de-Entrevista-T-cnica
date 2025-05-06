// Sons
const soundCorrect = document.getElementById('audio-correct');
const soundWrong = document.getElementById('audio-wrong');
const soundNext = document.getElementById('audio-next');
const soundFinish = document.getElementById('audio-finish');
const audios = [soundCorrect, soundWrong, soundNext, soundFinish];

function playCorrect() {
  soundCorrect.pause();
  soundCorrect.currentTime = 0;
  soundCorrect.play();
}
function playWrong() {
  soundWrong.pause();
  soundWrong.currentTime = 0;
  soundWrong.play();
}
function playNext() {
  soundNext.pause();
  soundNext.currentTime = 0;
  soundNext.play();
}
function playFinish() {
  soundFinish.pause();
  soundFinish.currentTime = 0;
  soundFinish.play();
}

// Elementos do DOM
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options');
const nextBtn = document.getElementById('next-btn');
const scoreText = document.getElementById('score-text');
const questionNumberText = document.getElementById('question-number');
const timerElement = document.getElementById('timer');
const difficultySelect = document.getElementById('difficulty');
const progressBar = document.getElementById('progress-bar');
const explanationDiv = document.getElementById('explanation');
const rankingDiv = document.getElementById('ranking');

// Variáveis de controle
let currentQuestion = 0;
let score = 0;
let difficulty = 'easy';
let timerInterval;
let timeLeft = 0;
let questionsFiltered = [];

// Início do quiz
document.getElementById('start-btn').addEventListener('click', () => {
  // Destrava todos os áudios na primeira interação do usuário
  audios.forEach(audio => {
    audio.volume = 0;
    audio.play().then(() => {
      audio.pause();
      audio.currentTime = 0;
      audio.volume = 1;
    }).catch(() => {});
  });

  difficulty = difficultySelect.value;
  startScreen.classList.add('hidden');
  quizScreen.classList.remove('hidden');
  // Suporte para future: perguntas por dificuldade
  questionsFiltered = questions.filter(q => !q.difficulty || q.difficulty === difficulty);
  shuffleArray(questionsFiltered);
  currentQuestion = 0;
  score = 0;
  showQuestion();
  updateProgress();
});

// Mostra a pergunta atual
function showQuestion() {
  const q = questionsFiltered[currentQuestion];
  questionText.textContent = q.question;
  questionNumberText.textContent = `Pergunta ${currentQuestion + 1} de ${questionsFiltered.length}`;
  optionsContainer.innerHTML = '';
  explanationDiv.innerHTML = '';

  // Cria os botões das opções
  q.options.forEach((option, index) => {
    const button = document.createElement('button');
    button.textContent = option;
    button.className =
      'w-full text-left p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition font-medium border-2 border-transparent';
    button.addEventListener('click', () => {
      clearInterval(timerInterval);
      selectOption(index);
    });
    optionsContainer.appendChild(button);
  });

  nextBtn.classList.add('hidden');
  startTimer();
  updateProgress();
}

// Barra de progresso
function updateProgress() {
  const percent = ((currentQuestion) / questionsFiltered.length) * 100;
  progressBar.style.width = `${percent}%`;
}

// Temporizador por dificuldade
function startTimer() {
  clearInterval(timerInterval); // Limpa qualquer timer anterior

  if (difficulty === 'easy') {
    timerElement.textContent = '⏱️ Sem limite de tempo';
    return;
  }

  timeLeft = difficulty === 'medium' ? 90 : 30;
  timerElement.textContent = `⏱️ ${formatTime(timeLeft)}`;

  timerInterval = setInterval(() => {
    timeLeft--;
    timerElement.textContent = `⏱️ ${formatTime(timeLeft)}`;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      autoFailQuestion();
    }
  }, 1000);
}

// Formata o tempo como mm:ss
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Quando o tempo acaba, marca como errada
function autoFailQuestion() {
  const q = questionsFiltered[currentQuestion];
  const buttons = optionsContainer.querySelectorAll('button');

  buttons.forEach((btn, index) => {
    btn.disabled = true;
    if (index === q.answer) {
      btn.classList.add('bg-green-600', 'border-green-400');
    } else {
      btn.classList.add('bg-gray-600');
    }
  });

  showExplanation(q);
  nextBtn.classList.remove('hidden');
  playWrong();
}

// Seleciona uma opção
function selectOption(selectedIndex) {
  const q = questionsFiltered[currentQuestion];
  const buttons = optionsContainer.querySelectorAll('button');

  buttons.forEach((btn, index) => {
    btn.disabled = true;
    if (index === q.answer) {
      btn.classList.add('bg-green-600', 'border-green-400');
    } else if (index === selectedIndex) {
      btn.classList.add('bg-red-600', 'border-red-400');
    } else {
      btn.classList.add('bg-gray-600');
    }
  });

  if (selectedIndex === q.answer) {
    score++;
    playCorrect();
  } else {
    playWrong();
  }

  showExplanation(q);
  nextBtn.classList.remove('hidden');
}

// Exibe explicação, se houver
function showExplanation(q) {
  if (q.explanation) {
    explanationDiv.innerHTML = `<div class="mt-2 p-3 bg-gray-700 rounded-lg"><span class="text-yellow-400 font-bold">Explicação:</span> ${q.explanation}</div>`;
  }
}

// Avança para próxima pergunta ou mostra resultado
nextBtn.addEventListener('click', () => {
  clearInterval(timerInterval);
  playNext();
  currentQuestion++;
  if (currentQuestion < questionsFiltered.length) {
    showQuestion();
  } else {
    showResult();
  }
});

// Exibe resultado final e ranking separado por dificuldade e pede nome do usuário
function showResult() {
  quizScreen.classList.add('hidden');
  resultScreen.classList.remove('hidden');
  scoreText.textContent = `Você acertou ${score} de ${questionsFiltered.length} perguntas.`;
  timerElement.textContent = '';

  // Solicita nome do usuário
  let userName = prompt("Digite seu nome para o ranking:", "Anônimo");
  if (!userName) userName = "Anônimo";

  updateRanking(userName);
  playFinish();
}

// Atualiza ranking local (top 5) separado por dificuldade
function updateRanking(userName) {
  let ranking = JSON.parse(localStorage.getItem('ranking') || '{}');
  if (!ranking[difficulty]) {
    ranking[difficulty] = [];
  }

  ranking[difficulty].push({ name: userName, score, total: questionsFiltered.length, date: new Date().toLocaleString() });
  ranking[difficulty].sort((a, b) => b.score - a.score);
  ranking[difficulty] = ranking[difficulty].slice(0, 5);

  localStorage.setItem('ranking', JSON.stringify(ranking));

  displayRanking(ranking[difficulty]);
}

// Exibe ranking da dificuldade atual
function displayRanking(rankingList) {
  rankingDiv.innerHTML = '<h3 class="font-bold mb-2">Ranking (Top 5):</h3>' +
    rankingList.map((r, i) =>
      `<div class="flex justify-between ${i === 0 ? 'font-bold text-green-400' : ''}">
        <span>${i + 1}º ${r.name}</span>
        <span>${r.score}/${r.total} - <span class="text-xs text-gray-400">${r.date}</span></span>
      </div>`
    ).join('');
}

// Reinicia o quiz
document.getElementById('restart-btn').addEventListener('click', () => {
  clearInterval(timerInterval);
  resultScreen.classList.add('hidden');
  quizScreen.classList.remove('hidden');
  currentQuestion = 0;
  score = 0;
  showQuestion();
  updateProgress();
});

// Função para embaralhar perguntas
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
