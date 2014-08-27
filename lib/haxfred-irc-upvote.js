var helpers = require('./helpers')(haxfred);

var haxfred_irc_upvote = function(haxfred) {
  haxfred.on('irc.msg', helpers.detectUpvoteRegex(haxfred.irc.users()), function(data, deferred) {

    var person = data.content.match(detectUpvoteRegex(haxfred.irc.users()))[0];

    haxfred.emit('irc.upvote',{
      recipient: person,
      sender: data.from
    });

    deferred.resolve();
  });


};

module.exports = haxfred_irc_upvote;
