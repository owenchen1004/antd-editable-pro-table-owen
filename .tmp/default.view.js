

export { default } from 'D:\\lowcode platform\\material\\zw-edit-protable\\zw-edit-protable\\src\\index.tsx';

import * as componentInstances from 'D:\\lowcode platform\\material\\zw-edit-protable\\zw-edit-protable\\src\\index.tsx';

import 'D:\\lowcode platform\\material\\zw-edit-protable\\zw-edit-protable\\src\\index.scss'

export * from 'D:\\lowcode platform\\material\\zw-edit-protable\\zw-edit-protable\\src\\index.tsx';

const coveredComponents = {};

const library = 'BizComps';
const execCompile = !!true;

if (!execCompile) {
  window[library] = Object.assign({__esModule: true}, componentInstances || {}, coveredComponents || {});
}

function getRealComponent(component, componentName) {
  if (component.default) return component.default;
  if (component[componentName]) return component[componentName];
  return component;
}