const backFacesArray = ['😲', '😴', '😑', '😍', '😜', '😒', '😁', '😉'];
const cards = document.querySelectorAll('.card'),
  frontFaces = document.querySelectorAll('.js_front'),
  backFaces = document.querySelectorAll('.js_back'),
  idexs = [],
  duplicatArray = duplicat(backFacesArray);

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

function pasteFace() {
  randomIdx()
  let i = 0;
  backFaces.forEach(back => {
    back.textContent = duplicatArray[idexs[i++]];
  })
}

pasteFace();


function flipTheCardAndMatch() {
  this.classList.add('card--open');
}

cards.forEach(card => card.addEventListener('click', flipTheCardAndMatch));
