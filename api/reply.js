const twit = require('twit')
const unique = require('unique-random-array')
const config = require('../config')

const param = config.twitterConfig
const randomReply = unique(param.randomReply.split('|'))

const bot = new twit(config.twitterKeys)

function tweetNow(text) {
  let tweet = {
    status: text
  }

  bot.post('statuses/update', tweet, (err, data, response) => {
    if (err) {
      console.log('REPLY ERROR', err);
    }
    console.log('SUCCESSFULLY REPLIED: ', text);
  })
}

const reply = event => {
  let screenName = event.source.screen_name

  if (screenName === config.twitterConfig.username) {
    return
  }
  const response = randomReply();

  const res = response.replace('${screenName}', screenName);

  tweetNow(res);
}

module.exports = reply;