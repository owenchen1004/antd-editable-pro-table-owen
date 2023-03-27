module.exports = function (content) {
  const newContent = content.replace(/(\d+)(rpx)/g, (match, p1) => {
    const newP1 = (p1 / 750 * 100).toFixed(2)
    const newP2 = 'vw'
    return newP1 + newP2
  })
  return newContent
}