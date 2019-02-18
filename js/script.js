const backFacesArray = ['😲', '😴', '😑', '😍', '😜', '😒', '😁', '😉'];
const cards = document.querySelectorAll('.card'),
  frontFaces = document.querySelectorAll('.js_front'),
  backFaces = document.querySelectorAll('.js_back'),
  idexs = [],
  duplicatArray = duplicat(backFacesArray);

let firstCard,
  matching = false,
  progress = 0;

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
  randomIdx()
  let i = 0;
  backFaces.forEach(back => {
    back.textContent = duplicatArray[idexs[i++]];
  })
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
      }, 1000)
    } else {
      progress++;
      firstCard = null;
      matching = false;
    }
  }
}

cards.forEach(card => card.addEventListener('click', flipTheCardAndMatch));