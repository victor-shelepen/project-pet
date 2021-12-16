console.log('Runner. Registers babel.')

require('source-map-support').install()

require('@babel/register')({
  extensions: ['.js'],
  ignore: [
    /node_modules[\\/](?!console-command-manager)/
  ],
});
