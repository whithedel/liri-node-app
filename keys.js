console.log('this is loaded');
//object constructor exporting your key and passwords from the .env file in which you stored the key and password
exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};
