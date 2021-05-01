const path = require('path')
const createExpoWebpackConfigAsync = require('@expo/webpack-config')
const { resolver } = require('./metro.config')

const root = path.resolve(__dirname, '..')
const node_modules = path.join(__dirname, 'node_modules')

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv)

  config.module.rules.push({
    test: /\.(js|ts|tsx)$/,
    include: path.resolve(root, 'src'),
    use: 'babel-loader',
  })

  Object.assign(config.resolve.alias, {
    ...resolver.extraNodeModules,
    'react-native-web': path.join(node_modules, 'react-native-web'),
  })

  return config
}
