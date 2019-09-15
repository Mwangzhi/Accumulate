const path = require('path')
// const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  mode : 'development',
  entry : './src/main.js',
  watch : true,
  output : {
    path : path.resolve( './dist' )
  },
  devServer : {
    contentBase : path.join(__dirname, 'dist'),
    port : 3000
  },
  module : {
    rules : [
      {
        test: /\.js$/,
        exclude : /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'stage-0'],
            plugins: [['transform-react-jsx', {
              pragma : 'dom'
            }]],
            babelrc: false
          }
        }]
      },
    ]
  }


}