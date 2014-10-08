var xml2js = require('xml2js');
var unirest = require('unirest');

var eventful;
(function (eventful) {
    var Client = (function () {
        function Client(key) {
            this.app_key = key;
            this.base_url = "http://api.eventful.com/rest/";
        }
        Client.prototype.searchEvents = function (options, callback) {
            var request = this.base_url + 'events/search?app_key=' + this.app_key;

            for (var i in options) {
                request += '&';

                request += i + '=' + options[i];
            }

            unirest.get(request, function (response, err) {
                if (err) {
                    return callback(err, null);
                }

                xml2js.parseString(response.body, { explicitArray: false }, function (err, parsed) {
                    if (err) {
                        return callback(err, null);
                    }

                    return callback(null, parsed);
                });
            });
        };

        Client.prototype.listCategories = function (callback) {
            var request = this.base_url + '/categories/list?app_key=' + this.app_key;

            unirest.get(request, function (response, err) {
                if (err) {
                    return callback(err, null);
                }

                xml2js.parseString(response.body, { explicitArray: false }, function (err, parsed) {
                    if (err) {
                        return callback(err, null);
                    }

                    return callback(null, parsed.categories.category);
                });
            });
        };
        return Client;
    })();
    eventful.Client = Client;
})(eventful || (eventful = {}));

module.exports = eventful;
//# sourceMappingURL=eventful-node.js.map
