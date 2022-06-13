// vue.config.js
module.exports = {
    // options...
    devServer: {
          proxy: 'https://api.openbrewerydb.org/breweries',
      }
  }