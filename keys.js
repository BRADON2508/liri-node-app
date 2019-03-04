console.log('this is loaded');
var keys = {
  spotify: {
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
  },
  omdb: {
    key: process.env.OMDB_KEY
  }
}
module.exports = keys
