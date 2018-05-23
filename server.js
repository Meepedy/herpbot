const { createServer } = require('https');

const twit = require('twit');
const config = require('./config');

const bot = new twit(config.twitterKeys);

const retweet = require('./api/retweet');
const reply = require('./api/reply');

console.log('Starting...');

retweet();
setInterval(retweet, config.twitterConfig.retweet);

const userStream = bot.stream('user');
userStream.on('follow', reply);

const server = createServer((req, res) => {
  res.writeHead(302, {
    Location: `https://twitter.com/${config.twitterConfig.username}`
  });
  res.end();
});

const port = process.env.PORT || 3000;
if (!module.parent){
  if (!port){
    throw new Error('Forgot to specify PORT');
  };
};
server.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
