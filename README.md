# MailChimp Subscription Middleware

## Assumptions
You have a mailchimp account
You've created a list
You have an API Key
You know what a computer is

## Use it
API key
http://kb.mailchimp.com/integrations/api-integrations/about-api-keys

List ID http://kb.mailchimp.com/lists/managing-subscribers/find-your-list-id
**Do not** remove the `-<datacenter>` at the end of your API token

```javascript
// express.js example
var mcSubscriber = require('mailchimp-subscription-middleware');

var options = {
  apiKey: 'abcdefghijklmnopqrstuvwxyz123456-us12',
  listId: '9e67587f52'
};

app.use('/subscribe', mcSubscriber(options));
```

```javascript
// browsersync example
// assumes that you have browsersync setup. This only shows how to use the
// middleware in your existing setup
// https://www.browsersync.io/docs/options/
var mcSubscriber = require('mailchimp-subscription-middleware');

var options = {
  apiKey: 'abcdefghijklmnopqrstuvwxyz123456-us12',
  listId: '9e67587f52'
};
var browserSyncOptions = {
  ...
  middleware: [{
    route: '/subscribe',
    handle: mcSubscriber(options)
  }]
  ...
};
```

## Response

```javascript
{
  "data": <Mailchimp Server Response>
}
```
