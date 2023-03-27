const {
  rpx2vw4style,
} = require('../dist/babel-runtime-jsx-style-transform.umd');
const { ts1, ts2 } = require('./input');

describe('success', () => {
  console.log(JSON.stringify(rpx2vw4style(ts1)));
  console.log(rpx2vw4style(ts2));
});
