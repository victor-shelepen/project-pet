const config = require('./babel.config.js')

require('@babel/register')({
  extensions: ['.js'],
  ignore: [
    /node_modules[\\/](?!console-command-manager)/
  ],
  ...config
});
