import {
  stickersNames,
  overlayId
} from './aggregator.js'

function addEvent(id, action, fn) {
  getId(id).addEventListener(action, fn)
}

function removeEvent(id, action, fn) {
  getId(id).removeEventListener(action, fn)
}

function addToId(id, add) {
  document.getElementById(id).innerHTML = add;
}

function addClass(id, name) {
  document.getElementById(id).classList.add(name)
}

function removeClass(id, name) {
  document.getElementById(id).classList.remove(name)
}

let shuffled = [];

function shuffle() {
  shuffled = stickersNames.sort(() => Math.random() - 0.5)
  return shuffled
}

function getLastShuffled() {
  return shuffled[shuffled.length - 1]
}

function getId(id) {
  return document.getElementById(id)
}

function removeAnimation() {
  removeAddClasses(overlayId, "animate-zoom", "hide")
}

function removeAddClasses(id, remove, add) {
  removeClass(id, remove)
  addClass(id, add)
}

function queryAllId(id) {
  return document.querySelectorAll(`#${id} img`);
}

function addClassText(id, addclass, text) {
  addClass(id, addclass)
  addToId(id, text)
}

function clearAddToIds(...clear) {
  for (let e of clear) {
    addToId(e, '')
  }
}

function removeAddEvents(id, action, remove, add) {
  removeEvent(id, action, remove)
  addEvent(id, action, add)
}

export {
  addClassText,
  removeEvent,
  queryAllId,
  addEvent,
  addToId,
  addClass,
  removeClass,
  shuffle,
  getId,
  removeAnimation,
  removeAddClasses,
  clearAddToIds,
  removeAddEvents,
  getLastShuffled,
}