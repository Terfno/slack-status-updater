require('dotenv').config();
const request = require('request');
var keypress = require('keypress');

keypress(process.stdin);

const SYSKEN = process.env.SYSKEN
const BOUKEN = process.env.BOUKEN

const URL = 'https://slack.com/api/users.profile.set';

let setStatus = (token, text, emoji, expiration) => {
  request.post(URL, {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    'auth': {
      'bearer': token
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
  let hour8 = Date.now() / 1000 + 8 * 60 * 60 * 60;
  let hour4 = Date.now() / 1000 + 4 * 60 * 60 * 60;

  process.stdin.on('keypress', (ch, key) => {
    if (key && key.ctrl && key.name == 'c') {
      process.exit();
    } else if (key && key.name == 'a') {
      // clear
      setStatus(BOUKEN, '自宅です || 帰りました', ':zzz:', 0);
      setStatus(SYSKEN, 'off', ':hatching_chick:', 0);
    } else if (key && key.name == 'b') {
      // lab
      setStatus(BOUKEN, '卒研室なう!', ':ok_woman:', hour8);
      setStatus(SYSKEN, '北館3階の房卒研室に居ます。いつでもどうぞ。', ':ok_woman:', hour8);
    } else if (key && key.name == 'c') {
      // server room
      setStatus(BOUKEN, '鯖室に行きます。鍵閉めちゃって大丈夫です', ':muscle:', hour8);
      setStatus(SYSKEN, '鯖室に居ます。', ':muscle:', hour8);
    } else if (key && key.name == 'd') {
      // out
      setStatus(BOUKEN, 'ちょっと出かけてます。急ぎなら電話をどうぞ→:telephone_receiver: 090-7948-3722', ':runner:', hour4);
      setStatus(SYSKEN, 'ちょっと出かけてます。急ぎなら電話をどうぞ→:telephone_receiver: 090-7948-3722', ':runner:', hour4);
    }
  });
};

main();
process.stdin.setRawMode(true);
process.stdin.resume();
