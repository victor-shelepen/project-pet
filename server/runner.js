console.log('Runner. Registers babel.')

require('@babel/register')({
  extensions: ['.js'],
  ignore: [
    /node_modules[\\/](?!console-command-manager)/
  ],
});
