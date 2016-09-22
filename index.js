var http = require('http');
var qs = require('querystring');

var MailchimpSubscriptionMiddleware = function (options) {
  var dataCenter = options.apiKey.match(/-(.*)$/)[1];
  var apiKey = options.apiKey;
  var listId = options.listId;

  return function (req, res) {
    var mailChimpUrl = dataCenter + '.api.mailchimp.com';
    var subscribePath = '/3.0/lists/' + listId + '/members';

    var formData = qs.parse(req._parsedUrl.query);
    var payload = JSON.stringify(formData);


    var options = {
      hostname: mailChimpUrl,
      auth: 'anystring:' + apiKey,
      port: 80,
      path: subscribePath,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
      }
    };

    var mcRequest = http.request(options, (mcResponse) => {
      res.statusCode = mcResponse.statusCode;

      var data = '';
      mcResponse.setEncoding('utf8');
      mcResponse.on('data', (chunk) => data += chunk);

      mcResponse.on('end', () => {
        res.write(JSON.stringify({data: JSON.parse(data)}));
        res.end();
      });
    });

    mcRequest.on('error', (event) => {
      res.write(JSON.stringify({data: event}));
    });

    mcRequest.write(payload);
    mcRequest.end();
  };
};

module.exports = MailchimpSubscriptionMiddleware;
