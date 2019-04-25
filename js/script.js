const backFacesArray = ['😲', '😴', '😑', '😍', '😜', '😒', '😁', '😉'];
const restartBtn = document.querySelector('.cards_btn'),
  cards = document.querySelectorAll('.card'),
  frontFaces = document.querySelectorAll('.js_front'),
  backFaces = document.querySelectorAll('.js_back'),
  resultBoard = document.querySelector('.cards_result'),
  resultText = document.querySelector('.cards_win'),
  duplicatArray = duplicat(backFacesArray);


let firstCard,
  matching = false,
  idexs = [],
  cardsOpen = 0;

function duplicat(array) {
  const dArray = [];
  array.map(item => {
    dArray.push(item);
    dArray.push(item);
  });
  return dArray;
}

function randomIdx() {
  if (idexs.length === duplicatArray.length) return;
  const idx = Math.floor(Math.random() * duplicatArray.length);
  if (!idexs.includes(idx)) {
    idexs.push(idx);
    randomIdx();
  } else randomIdx();
}

function restartGame() {
  console.log('restart the game!');
  cards.forEach(card => {
    card.classList.remove('card--open');
  });
  initGame();
}

function initGame() {
  firstCard;
  matching = false;
  idexs = [];
  cardsOpen = 0;
  randomIdx();
  let i = 0;
  backFaces.forEach(back => {
    back.textContent = duplicatArray[idexs[i++]];
    console.log(back.textContent);
  });
  cards.forEach(card => card.addEventListener('click', flipTheCardAndMatch));
}

initGame();


function flipTheCardAndMatch() {
  if (matching) return;
  this.classList.add('card--open');
  if (!firstCard) firstCard = this;
  else {
    matching = true;
    if (this.textContent !== firstCard.textContent) {
      setTimeout(() => {
        this.classList.remove('card--open');
        firstCard.classList.remove('card--open');
        firstCard = null;
        matching = false;
      }, 500)
    } else {
      cardsOpen++;
      firstCard = null;
      matching = false;
      if (cardsOpen === 8) {
        resultBoard.classList.add('cards_result--show');
        setTimeout(() => {
          resultText.classList.add('cards_win--done');
        }, 500);
      }
    }
  }
}

restartBtn.addEventListener('click', () => {
  restartGame();
  resultBoard.classList.remove('cards_result--show');
  resultText.classList.remove('cards_win--done');
})