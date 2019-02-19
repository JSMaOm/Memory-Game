const backFacesArray = ['😲', '😴', '😑', '😍', '😜', '😒', '😁', '😉'];
const cards = document.querySelectorAll('.card'),
  frontFaces = document.querySelectorAll('.js_front'),
  backFaces = document.querySelectorAll('.js_back'),
  resultBoard = document.querySelector('.cards_result'),
  resultText = document.querySelector('.cards_win'),
  idexs = [],
  duplicatArray = duplicat(backFacesArray);

let firstCard,
  matching = false,
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

function initGame() {
  randomIdx();
  let i = 0;
  backFaces.forEach(back => {
    back.textContent = duplicatArray[idexs[i++]];
  })
}

initGame();


function flipTheCardAndMatch() {
  console.log('clikcked');
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

cards.forEach(card => card.addEventListener('click', flipTheCardAndMatch));