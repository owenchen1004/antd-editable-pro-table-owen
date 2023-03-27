# babel-plugin-transform-jsx-list

Support of transform jsx list directive.

## Example

**In**

```jsx
<View x-for={(item, key) in foo}>key: {key}, item: {item}</View>
```

**Out**

```jsx
{createList.call(this, foo, (item, key) => <View>key: {key}, item: {item}</View>)}
```

## Installation

```sh
$ npm install babel-plugin-transform-jsx-condition
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-jsx-list"]
}
```

### Via CLI

```sh
$ babel --plugins transform-jsx-list script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-jsx-list"]
});
```
