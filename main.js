import {
  setLoop,
  backLevel,
  nextLevel,
  addEvent,
  showstarttimer,
  restartgame,
  toggleMode,
  fullscreen,
  toggleFullscreen,
  getId,
  stickers,
  removeAddClasses,
} from './scripts/aggregator.js'

addEvent('next', 'click', nextLevel)
addEvent('back', 'click', backLevel)
addEvent('loop', 'click', setLoop)
addEvent('landingpage', 'click', () => fullscreen('landingpage'))
addEvent('fullscreen', 'click', toggleFullscreen)
addEvent('timer', 'click', showstarttimer)
addEvent('restart', 'click', restartgame)
addEvent('modebtn', 'click', toggleMode)
addEvent('numberPanel', 'click', (e) => checkclicked(e))
addEvent('logo', 'click', togglemenu)
addEvent('checker', 'click', showConvertor)
addEvent('closeMenu', 'click', closeConvertor)

function closeConvertor() {
  removeAddClasses('searchContainer', 'flexing', 'hide')
}

function showConvertor() {
  removeAddClasses('searchContainer', 'hide', 'flexing')
  togglemenu()
}

function togglemenu() {
  let closed = getId('slidemenu').classList.toggle('close')
}


let checked = '';

function showImage(image) {
  getId('imageFound').innerHTML += `<img src='stickers/${stickers[image].name}.webp'>`
  getId('searched').textContent = ''
}

function checkSearch(content) {
  return stickers.includes(stickers[content])
}

function checkclicked(e) {
  let content = e.target.textContent;
  if (content.length == 1) {
    getId('searched').textContent += content;
    checked = checkSearch(getId('searched').textContent)
  }
  if (content === 'Clear') {
    getId('searched').textContent = '';
    checked = true
  }
  if (content === 'Enter') {
    showImage(getId('searched').textContent)
  }
  if (content === 'Reset') {
    getId('imageFound').innerHTML = '';
    getId('searched').textContent = '';
    checked = true
  }
  if (checked) {
    getId('error').textContent = 'valid search'
    removeAddClasses('error', 'redtext', 'greentext')
    getId('enter').disabled = false
  } else {
    getId('error').textContent = 'invalid search'
    removeAddClasses('error', 'greentext', 'redtext')
    getId('enter').disabled = true
  }
}


/********                                                                                                  ***/