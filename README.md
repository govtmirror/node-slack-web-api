# node-slack-web-api
Post messages to slack using its restful API

Based on this [documentation](https://api.slack.com/slackbot) from slack.

Usage:
------
You can require this in your package.json with the following line
```
"node-slack-web-api": ""git+https://github.com/jimmyrocks/node-slack-web-api/#master"
```

You will need to make a config similar to what's in `example.config.json` and pass it as a JSON object when creating the SlackApi.
If you want, you can also put a `config.json` file in the root path, and it'll pick that up if no other config is specified.
The example and tests use the `config.json` method.

node-slack-web-api supports both promises (provided by Bluebird) or a simple callback(err, result).

```
var SlackApi = require('node-slack-web-api');
  config = require('./config')
  message,
  slack = new SlackAPI(config);

// Using the default settings out of config.json
message = 'test message';

// Using your own defined settings
message = {
  "text": "message",
  "channel": "#general",
  "username": "node-slack-web-api-bot",
  "icon_emoji": ":monkey_face:"
};

// using a callback
slack(message, function(err, result) {
  if (err) {
    console.log('Error', err);
  } else {
    console.log('Success', result);
  }
});

// using a promise (bluebird)
slack(message)
  .then(function(result) {
    console.log('Success', result);
  })
  .catch(function(err) {
    console.log('Error', error);
  });
```

You can look at the test.js for working examples.

Test usage:
-----------
`node test "message"`
or
`node test '{"text": "message", "channel": "#feeds", "username": "npmap-bot", "icon_emoji": ":monkey_face:"}'`

This will post two (2) messages to slack because it also works as the example of how to use callback or promises
