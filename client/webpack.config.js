
module.exports = function(env) {
  return require(`./webpack.${ env || 'dev' }.config.js`)
}
