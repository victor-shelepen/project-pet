console.log('Babel. Configuration.');

module.exports = {
  presets: [['@babel/preset-env', { targets: { node: 'current' } }]],
  plugins: [
    'source-map-support'
  ],
  sourceMap: 'inline',
  retainLines: true
};
