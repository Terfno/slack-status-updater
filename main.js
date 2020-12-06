require('dotenv').config();
const request = require('request');
var keypress = require('keypress');

keypress(process.stdin);

const TOKEN = process.env.token
const URL = 'https://slack.com/api/users.profile.set';

let setStatus = (text, emoji, expiration) => {
  request.post(URL, {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    'auth': {
      'bearer': TOKEN
    },
    json: {
      profile: {
        status_text: text,
        status_emoji: emoji,
        status_expiration: expiration
      }
    }
  }, (err, res, body) => {
    new Date()
    console.log(body.ok ? Date.now() / 1000 + ' | success ' + emoji : body);
  });
};

let main = () => {
  new Date()
  process.stdin.on('keypress', (ch, key) => {
    if (key && key.ctrl && key.name == 'c') {
      process.exit();
    } else if (key && key.name == 'a') {
      // clear
      setStatus('', '', 0);
    } else if (key && key.name == 'b') {
      // lab
      setStatus('北館3階の房卒研室に居ます。いつでもどうぞ。', ':ok_woman:', Date.now() / 1000 + 8 * 60 * 60);
    } else if (key && key.name == 'c') {
      // server room
      setStatus('鯖室に居ます。', ':muscle:', Date.now() / 1000 + 8 * 60 * 60);
    } else if (key && key.name == 'd') {
      // out
      setStatus('ちょっと出かけてます。急ぎなら電話をどうぞ→:telephone_receiver: 090-7948-3722', ':runner:', Date.now() / 1000 + 4 * 60 * 60);
    }
  });
};

main();
process.stdin.setRawMode(true);
process.stdin.resume();
