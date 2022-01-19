/*
 * @Description: eslint规则
 * @Autor: Espada
 * @Date: 2022-01-14 15:45:33
 * @LastEditors: Espada
 * @LastEditTime: 2022-01-17 15:50:29
 * @FilePath: \earth\.eslintrc.js
 */
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'prefer-const': ["warn", { "ignoreReadBeforeAssign": false }],
    "no-unused-vars": ["warn", { "vars": "all", "args": "after-used", "ignoreRestSiblings": false }]
  }
}
