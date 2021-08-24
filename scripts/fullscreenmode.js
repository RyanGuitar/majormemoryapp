import {
  addClass,
  removeClass,
  getId,
  auto,
} from './aggregator.js'

function requestFullscreenMode() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
    screen.orientation.lock('landscape');
    addClass('fullscreen', 'active')
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
      removeClass('fullscreen', 'active')
    }
  }
}

function fullscreen(id) {
  requestFullscreenMode()
  removeClass('game', 'hide')
  getId(id).style.display = "none";
  auto(0);
}

function toggleFullscreen() {
  requestFullscreenMode()
}

export {
  requestFullscreenMode,
  fullscreen,
  toggleFullscreen,
}