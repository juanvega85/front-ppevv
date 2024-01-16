
module.exports = {
  ...require('@ppe/eslint-config/eslint-react.js'),
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig.json'
  }
}
