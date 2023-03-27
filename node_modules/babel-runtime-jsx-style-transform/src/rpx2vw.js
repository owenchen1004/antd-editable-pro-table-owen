const rpxRegex = /"[^"]+"|'[^']+'|url\([^\)]+\)|(\d*\.?\d+)rpx/g;

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

// transform rpx to vw
function createRpxReplace(opts, viewportUnit, viewportSize) {
  return function (m, $1) {
    if (!$1) {
      return m;
    }
    const pixels = parseFloat($1);
    const parsedVal = toFixed(
      (pixels / viewportSize) * 100,
      opts.unitPrecision
    );
    return parsedVal + viewportUnit;
  };
}

function rpx2vw(str, options = {}) {
  const opts = Object.assign({}, defaults, options);
  if (typeof str !== 'string') {
    return str;
  }
  if (str.indexOf('rpx') === -1) {
    return str;
  }
  return str.replace(
    rpxRegex,
    createRpxReplace(opts, opts.viewportUnit, opts.viewportWidth)
  );
}

export default rpx2vw;
