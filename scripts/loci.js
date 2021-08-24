let stickersNames = []
let stepper = ''

function getStartType() {
  return stepper;
}

function Loci(numType, stickersSrc) {
  let filteredStickers = stickersSrc.filter(({
    type
  }) => type == numType.toString())
  let stickersImages = '';
  stepper = numType
  stickersNames = []
  for (let {
    name, num
  } of filteredStickers) {
    stickersNames.push(num)
    stickersImages += `<img src="stickers/${name}.webp" class="${num}" loading="lazy" downloadable="false" alt="${name} ${numType}">`
  }
  return stickersImages
}

export {
  Loci,
  stickersNames,
  stepper,
  getStartType,
}