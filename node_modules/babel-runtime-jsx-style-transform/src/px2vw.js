const pxRegex = /"[^"]+"|'[^']+'|url\([^\)]+\)|(\d*\.?\d+)px/g;

const defaults = {
  viewportWidth: 750,
  viewportUnit: 'vw',
  fontViewportUnit: 'vw',
  unitPrecision: 5,
};

function toFixed(number, precision) {
  const multiplier = Math.pow(10, precision + 1);
  const wholeNumber = Math.floor(number * multiplier);

  return (Math.round(wholeNumber / 10) * 10) / multiplier;
}

// transform px to vw
function createPxReplace(opts, viewportUnit, viewportSize) {
  return function(m, $1) {
    if (!$1) {
      return m;
    }
    const pixels = parseFloat($1);
    const parsedVal = toFixed((pixels / viewportSize) * 100, opts.unitPrecision);
    return parsedVal + viewportUnit;
  };
}

function px2vw(str, options) {
  const opts = Object.assign({}, defaults, options);
  if (str.indexOf('px') === -1) {
    return;
  }
  return str.replace(pxRegex, createPxReplace(opts, opts.viewportUnit, opts.viewportWidth));
}

export default px2vw;
