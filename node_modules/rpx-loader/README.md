# rpx-loader

## 简介 | Introduction

**强烈建议使用[postcss-rpx-loader](https://www.npmjs.com/package/postcss-rpx-loader)取代本loader，使用postcss插件将更加简单、高效**

本loader可以让你在webpack项目中使用响应式长度单位`rpx`，用法同微信小程序

可以取代`rem`和`flexible.js`等解决方案

**It is highly recommended to use [postcss-rpx-loader](https://www.npmjs.com/package/postcss-rpx-loader) instead. Using postcss plugins is a simpler and more effective way.**

This webpack loader is an implement of WeChat rpx in webpack projects.

It may replace `rem` and `flexible.js` solution.

Please scroll down for English readme.

## 优点

### 照搬标注图

可以直接将UI标注图上的`px`值照搬到CSS（或SCSS等）中，loader会自动完成转换，无需手动换算为`rem`等单位

### 提高客户端性能

单位转换由webpack处理，无需在客户端引入任何JS库，从而提高性能

### 与组件库无冲突

不依赖`<html data-dpr="">`，引入第三方组件库后，不会导致其变大或变小

### 不覆盖原生单位

`rpx`是新增单位，不覆盖CSS原有单位如`rem`、`em`和`px`等，原有单位依然可以正常使用

### VW本质

由于本质上是`vw`，所以能够解决真实1px、视网膜屏幕等问题

## 使用方法

首先确保安装了[css-loader](https://www.npmjs.com/package/css-loader)以及你所需的预处理器的loader

在项目根目录中，执行`npm i rpx-loader -D`

在`webpack.config.js`中, 将`rpx-loader`插入到`css-loader`之前

```javascript
module.exports = {
  module: {
    rules: [{
    test: /\.css$/,
    use: [
      'style-loader',
      'rpx-loader', // 将`rpx-loader`插入到`css-loader`之前
      'css-loader'
    ]
    }, {
    test: /\.scss$/, // 也可以用于预处理器
    use: [
      'vue-style-loader', // 可以与其它loader连环
      'rpx-loader', // 将`rpx-loader`插入到`css-loader`之前
      'css-loader',
      'sass-loader'
    ]
    }]
  }
}
```

在样式文件中，使用rpx作为单位：

```css
div {
  /* 如果UI标注图上为50px，则只需要写50rpx */
  height: 50rpx;
}
```

最终你会得到：

```css
div {
  height: 6.67vw;
}
```

在不同宽度的设备上，视觉效果是一致的

## 注意事项

为简化配置，本loader默认UI标注图的宽度为750px

如需修改，可以自行改源码（源码极其短小，把750改成你的UI标注图宽度即可）

或者直接用同款PostCSS插件吧！它可以设置UI标注图宽度（见文档开头）

## Features

### Copy UI mark to code

Enables you to directly copy the `px` value in marked UI to your CSS (or other preprocessors), and the loader will compile them responsively without manually converting `px` values to `rem` or other units.

### Better performance

Webpack will handle the unit conversion, and you needn't import any JS libs in the client. In other words, a better performance.

### No conflict with third-party UI libs

It doesn't depend on `<html data-dpr=""`, therefore, you won't get oversized or shrinked third-party UI lib.

### No overwriting exsiting units

Since `rpx` is a new unit, existing units like `rem`, `em` and `px` are not overwritten and work as what they originally does.

### VW core

It performs well on retina screens, and it well resolves real 1px problem, since the essence of `rpx` is `vw`.

## Usage

Ensure that you've installed [css-loader](https://www.npmjs.com/package/css-loader) and the loader of your preferred preprocessor.

Run `npm i rpx-loader -D` in the root directory of your project.

In `webpack.config.js`, you need to insert `rpx-loader` before `css-loader`

```javascript
module.exports = {
  module: {
    rules: [{
    test: /\.css$/,
    use: [
      'style-loader',
      'rpx-loader', // insert 'rpx-loader' before 'css-loader'
      'css-loader'
    ]
    }, {
    test: /\.scss$/, // also works in preprocessors
    use: [
      'vue-style-loader', // can be chained with other loaders
      'rpx-loader', // insert 'rpx-loader' before 'css-loader'
      'css-loader',
      'sass-loader'
    ]
    }]
  }
}
```

In your style sheet, you can write as below:

```scss
div {
    height: 50rpx; // If it is 50px in the marked UI, you just need to write 50rpx
}
```

And you will get:

```css
div {
    height: 6.67vw;
}
```

In devices with different screen widths, you will get uniform visual effects.

## P.S.

The loader takes your UI width as 750px for granted, thus to minimize the config.

If you do need to config this, you may modify the source code. Don't worry, the source code is extremely short and dead simple. Just change 750 to your preferred width.

Using PostCSS version is a better choice! Adjusting UI width in PostCSS plugin is available. (See the beginning of this doc)