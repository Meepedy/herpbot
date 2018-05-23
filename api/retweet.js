const twit = require('twit');
const unique = require('unique-random-array');
const config = require('../config');
const isReply = require('../helpers/isReply');

const param = config.twitterConfig;
const queryString = unique(param.queryString.split(','));

const bot = new twit(config.twitterKeys);

const retweet = () => {
  const query = queryString();

  bot.get(
    'search/tweets',
    {
      q: query,
      result_type: param.resultType,
      lang: param.language,
      filter: 'safe',
      count: param.searchCount
    },
    (err, data, response) => {
      if (err) {
        console.log('Cannot Search Tweet!, Description here: ', err)
      } else {

        const rando = Math.floor(Math.random() * data.statuses.length)
        let retweetId

        if (!isReply(data.statuses[rando])) {
          retweetId = data.statuses[rando].id_str
        }

        bot.post(
          'statuses/retweet/:id',
          {
            id: retweetId
          },
          (err, response) => {
            if (err) {
              console.log('RETWEET ERROR');
            }
            console.log('RETWEET SUCCESS: ', data.statuses[rando].text)
          }
        )
      }
    }
  )
}

module.exports = retweet