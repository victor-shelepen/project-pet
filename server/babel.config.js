console.log('Babel. Configuration.');

module.exports = {
  presets: [['@babel/preset-env', { targets: { node: 'current' } }]],
  plugins: [],
  sourceMap: "inline"
};
