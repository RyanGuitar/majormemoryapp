import {
  removeAddClasses,
  removeEvent,
  addEvent,
  addClass,
  addToId,
  resetwrongclicked,
  removeClass,
  resetclickedcount,
  getclickedcount,
  getStartType,
  setGameParams,
  imageViewId,
  Loci,
  stickers,
  showClick,
  addMatch,
  addClassText,
  clearAddToIds,
  removeAddEvents,
  getWrongClicked,
  getLastShuffled,
  toggleMode,
  auto,
} from './aggregator.js'

let start = 0;
let end = 0;
let starttype = 0;
let timer = 0;
let counter = 3;

function starttime() {
  start = Date.now();
}

function showstarttimer() {
  addClass('modeview', 'hide')
  starttype = getStartType()
  removeAddClasses('starttimer', 'hide', 'flexing')
  addEvent('starttimer', 'click', starttimer)
  addClassText('timer', 'active', 'Ready?')
  clearAddToIds('average', 'clickedcount', 'wrong', 'problemimages')
}

function countingDown() {
  counter--;
  if (counter > 0) {
    addToId('countdown', counter);
  }
  if (counter == 0) {
    removeAddClasses('countdown', 'flexing', 'hide')
  }
  if (counter < 0) {
    counter = 3;
    clearInterval(timer)
    auto(starttype)
    removeClass('modeview', 'hide')
    /*showClick()
    addMatch()
    toggleMode()*/
    //addMatch('modeview', getLastShuffled())
    starttime()
  }
}

function startCountdown() {
  addToId('countdown', counter)
  timer = setInterval(countingDown, 1000);
}

function starttimer() {
  removeAddClasses('starttimer', 'flexing', 'hide')
  removeAddClasses('timer', 'active', 'red')
  removeAddEvents('timer', 'click', showstarttimer, showstoppedtimer)
  addToId('timer', 'Stop Timer')
  //starttime()
  resetclickedcount()
  resetwrongclicked()
  removeAddClasses('countdown', 'hide', 'flexing')
  startCountdown()
}

function convertSeconds(total) {
  let time = total
  let convert = (time/60).toFixed(2)
  let [minutes,
    seconds] = convert.toString().split('.')
  seconds = Math.round((seconds*60)/100)
  if (minutes == 0) {
    return `${seconds} sec`;
  } else {
    if (seconds == 0) {
      return `${minutes} min`;
    } else {
      return `${minutes} min ${seconds} sec`;
    }
  }
}

function showstoppedtimer() {
  removeAddClasses('stoptimer', 'hide', 'flexing')
  removeAddEvents('timer', 'click', showstoppedtimer, showstarttimer)
  removeClass('timer', 'red')
  addToId('timer', 'timer mode')
  addEvent('continue', 'click', replaygame)
  end = Date.now();
  let totaltime = (((end - start)/1000).toFixed(2));
  addToId('total', convertSeconds(+totaltime))
  if (!getclickedcount() == 0) {
    addToId('average', `Average: ${(totaltime/getclickedcount()).toFixed(2)} per image`)
    addToId('clickedcount', `Correct: ${getclickedcount() - getWrongClicked()}`)
  }
  resetclickedcount()
  resetwrongclicked()
}

function replaygame() {
  removeAddClasses('stoptimer', 'flexing', 'hide')
}

function restartgame() {
  replaygame()
  setGameParams('loci', 'background', stickers)
  addToId(imageViewId, Loci(starttype, stickers))
  showClick()
  addMatch()
}

export {
  showstarttimer,
  showstoppedtimer,
  starttimer,
  replaygame,
  restartgame,
}