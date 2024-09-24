let cards = JSON.parse(localStorage.getItem('flashcards')) || [];
let currentCard = 0;
let isFlipped = false;
let startTime;
let sessionInterval;

const flashcard = document.getElementById('flashcard');
const question = document.getElementById('question');
const answer = document.getElementById('answer');
const timeDisplay = document.getElementById('time-display');
const addCardButton = document.getElementById('add-card');
const novaPergunta = document.getElementById('nova-pergunta');
const novaResposta = document.getElementById('nova-resposta');
const escolherAleatoriaButton = document.getElementById('escolher-aleatoria');

document.getElementById('flip-card').addEventListener('click', flipCard);
document.getElementById('prev-card').addEventListener('click', prevCard);
document.getElementById('next-card').addEventListener('click', nextCard);
document.getElementById('start-session').addEventListener('click', startSession);
document.getElementById('end-session').addEventListener('click', endSession);
addCardButton.addEventListener('click', addFlashcard);
escolherAleatoriaButton.addEventListener('click', escolherPerguntaAleatoria);

function updateCard() {
  if (cards.length > 0) {
    question.textContent = cards[currentCard].pergunta;
    answer.textContent = cards[currentCard].resposta;
  } else {
    question.textContent = 'Nenhuma pergunta';
    answer.textContent = '';
  }
  flashcard.classList.remove('flipped');
  isFlipped = false;
}

function flipCard() {
  flashcard.classList.toggle('flipped');
}

function prevCard() {
  if (currentCard > 0) {
    currentCard--;
    updateCard();
  }
}

function nextCard() {
  if (currentCard < cards.length - 1) {
    currentCard++;
    updateCard();
  }
}

function startSession() {
  startTime = new Date();
  sessionInterval = setInterval(updateTime, 1000);
}

function endSession() {
  clearInterval(sessionInterval);
  const totalTime = Math.floor((new Date() - startTime) / 1000);
  alert(`Sessão finalizada! Tempo total: ${totalTime} segundos`);
}

function updateTime() {
  const elapsedTime = Math.floor((new Date() - startTime) / 1000);
  timeDisplay.textContent = `Tempo: ${Math.floor(elapsedTime / 60)}:${('0' + elapsedTime % 60).slice(-2)}`;
}

function addFlashcard() {
  const perguntaText = novaPergunta.value;
  const respostaText = novaResposta.value;

  if (perguntaText && respostaText) {
    cards.push({ pergunta: perguntaText, resposta: respostaText });
    localStorage.setItem('flashcards', JSON.stringify(cards));
    updateCard();
    novaPergunta.value = '';
    novaResposta.value = '';
  } else {
    alert("Preencha os campos de pergunta e resposta.");
  }
}

function escolherPerguntaAleatoria() {
  if (cards.length > 0) {
    currentCard = Math.floor(Math.random() * cards.length);
    updateCard();
  }
}

// Inicializa o primeiro flashcard
updateCard();
