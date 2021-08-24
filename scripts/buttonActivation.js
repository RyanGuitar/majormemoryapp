import {
  getId
} from './aggregator.js';

function removeActive() {
  let children = getId('navigation').children;
  for (let i = 0; i < children.length; i++) {
    children[i].classList.remove('active')
  }
}

function addActiveEvent() {
  getId('navigation').addEventListener('click', (e) => {
    if (e.target.localName == 'button') {
      removeActive()
      e.target.classList.add('active');
    }
  });
}

export {
  addActiveEvent
}