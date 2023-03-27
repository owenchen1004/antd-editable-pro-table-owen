module.exports = {
  extends: ['eslint-config-rax/react', 'eslint-config-rax/typescript'],
  globals: {},
  rules: {
    "@typescript-eslint/no-use-before-define": ["error", { "variables": false }],
    "@typescript-eslint/no-explicit-any": "off"
  }
};
