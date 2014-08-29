var helpers = require('./helpers');

var haxfred_irc_upvote = function(haxfred) {
  haxfred.on('irc.msg', helpers.detectUpvoteRegex(haxfred.irc.getUsers(haxfred.config.channels[0])), function(data, deferred) {

    var person = data.content.match(detectUpvoteRegex(haxfred.irc.getUsers(haxfred.config.channels[0])))[0];

    haxfred.emit('irc.upvote',{
      recipient: person,
      sender: data.from
    });

    console.log("upvote");
    deferred.resolve();
  });


};

module.exports = haxfred_irc_upvote;
