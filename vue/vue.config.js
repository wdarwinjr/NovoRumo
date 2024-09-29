const { defineConfig } = require('@vue/cli-service')
module.exports = {
  configureWebpack: {
    devtool: 'source-map'
    },

  transpileDependencies: [
    'vuetify'
  ]
};
// defineConfig({
  //   transpileDependencies: [
    //     'vuetify'
    //   ],
  // })
    
