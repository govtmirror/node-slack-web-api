/* Usage
 * node test "message"
 * node test '{"text": "message", "channel": "#feeds", "username": "npmap-bot", "icon_emoji": ":monkey_face:"}'
 *
 * This will post two (2) messages to slack
 * because it also works as the example of how
 * to use callback or promises
 *
 * */

var Slack = require('./index'),
  config = require('./config'),
  cli = process.argv.pop(),
  cliJson,
  slack = new Slack(config);

// Convert the cli string from JSON if it is JSON, otherwise just use it as is
try {
  cliJson = JSON.parse(cli);
} catch (e) {
  cliJson = cli;
}

// Test with callback
slack(cliJson, function(err, result) {
  if (err) {
    console.log('Error:', err);
  } else {
    console.log('Success:', result);
  }
});

//Test with bluebird
slack(cliJson)
  .then(function(result) {
    console.log('Success:', result);
  })
  .catch(function(err) {
    console.log('Error:', err);
  });
