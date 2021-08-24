import {
  removeClass,
  addClass,
  Loci,
  addToId,
  shuffle,
  getId,
  removeAnimation,
  removeAddClasses,
} from './aggregator.js'

let imageViewId = 'loci';
let matchId = 'match';
let overlayId = 'overlay';
let stickersSrc = {};
let step = '';
let loop = false;
let clickedstickers = 0;
let wrongclicked = new Set();

function setGameParams(images, backgroundId, stickerData) {
  imageViewId = images
  backgroundId = backgroundId
  stickersSrc = stickerData
}

function getWrongClicked() {
  return wrongclicked.size
}

function setLoop() {
  loop = loop? false: true;
  getId('loop').classList.toggle('active')
}

function updateView() {
  addToId(imageViewId, Loci(step, stickersSrc));
  addMatch();
  showClick();
}

function backLevel() {
  if (!loop) {
    if (step == 0) {
      step = stickersSrc[stickersSrc.length - 1].type;
    } else {
      step--;
    }
  }
  updateView();
}

function nextLevel() {
  if (!loop) {
    if (step < stickersSrc[stickersSrc.length - 1].type) {
      step++;
    } else {
      step = 0;
    }
  }
  updateView();
}

let toggle = true;
let getCode = '';
let mode = '';

function toggleMode() {
  toggle = toggle? false: true;
  getToClick()
}

function getToClick() {
  mode = toggle? stickersSrc[getCode].num: stickersSrc[getCode].name;
  addToId('modeview', mode)
}

function addMatch() {
  let shuffleSticker = '';
  if (shuffle().length > 0) {
    shuffleSticker = shuffle()
    getCode = shuffleSticker.pop()
    step = stickersSrc[getCode].type;
    getToClick(getCode)
    addToId('name', stickersSrc[getCode].name);
    getId(matchId).innerText = getCode
  } else {
    setTimeout(nextLevel, 100);
    getId(matchId).innerText = "";
  }
}

function resetAnimation() {
  removeAnimation()
  removeClass(overlayId, 'flexing')
}

function clickedsticker() {
  clickedstickers++;
}

function getclickedcount() {
  return clickedstickers
}

function resetclickedcount() {
  clickedstickers = 0;
}

function resetwrongclicked() {
  wrongclicked.clear()
}

function wrongclicks(wrong) {
  wrongclicked.add(wrong)
  if (wrongclicked.size > 0) {
    addToId('wrong', `wrong: ${wrongclicked.size}`)
  }
  let mistakeTemplate = ''
  for (let wrong of wrongclicked) {
    mistakeTemplate += `
    <img src=stickers/${stickersSrc[wrong].name}.webp>
    `
  }
  addToId('problemimages', mistakeTemplate)
}

function checkMatch(matchWith, clicked, target) {
  if (matchWith == clicked) {
    addMatch()
    target.add('fade')
    clickedsticker()
  } else {
    wrongclicks(matchWith)
    removeAddClasses(overlayId, "hide", "animate-zoom")
    addClass(overlayId, 'flexing')
    setTimeout(resetAnimation, 1000);
  }
}

function queryAllId(id) {
  return document.querySelectorAll(`#${id} img`);
}

function showClick() {
  queryAllId(imageViewId).forEach((stickerSrc) => {
    stickerSrc.addEventListener('click', (e) => {
      let clicked = e.target.classList[0];
      let matchWith = getId(matchId).textContent
      checkMatch(matchWith, clicked, e.target.classList)
    })
  })
}

export {
  resetwrongclicked,
  resetclickedcount,
  getclickedcount,
  setLoop,
  updateView,
  backLevel,
  nextLevel,
  setGameParams,
  checkMatch,
  showClick,
  addMatch,
  overlayId,
  imageViewId,
  getWrongClicked,
  toggleMode,
}