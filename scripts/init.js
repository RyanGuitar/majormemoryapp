import {
  stickers,
  setGameParams,
  addToId,
  imageViewId,
  Loci,
  showClick,
  addMatch,
  toggleMode,
  addActiveEvent,
} from './aggregator.js';

function init() {
  showClick();
  addMatch();
  // toggleMode();
  addActiveEvent();
}

function auto(group) {
  setGameParams('loci', 'background', stickers);
  addToId(imageViewId, Loci(group, stickers));
  init();
}

export {
  auto,
}