# babel-plugin-transform-jsx-fragment



## Example

**In**

```js
export default function Foo() {
  return (<Fragment></Fragment>);
}
```

**Out**

```js
import { Fragment } from "rax";

export default function Foo() {
  return <Fragment></Fragment>;
}
```

## Installation

```sh
$ npm install babel-plugin-transform-jsx-fragment
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": [
    ["transform-jsx-fragment", {
      "moduleName": "preact",
      "ignoreModuleCheck": false,
    }]
  ]
}
```

- moduleName: String, Optional, import module name, default to 'rax'.
- ignoreModuleCheck: Boolean, Optional, ignore checking the imported `Fragment` from same `moduleName`, default to `false`.

### Via CLI

```sh
$ babel --plugins transform-jsx-fragment script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-jsx-fragment"]
});
```
