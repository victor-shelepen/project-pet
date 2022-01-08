module.exports = {
  apps : [{
    name: "app",
    script: "node -r ./runner.js ./src/commander/index.js app.listen",
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    }
  }]
}
