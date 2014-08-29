var helpers = require('./helpers');

var haxfred_irc_upvote = function(haxfred) {
  haxfred.on('irc.msg', helpers.detectUpvoteRegex(haxfred.irc.users[data.message.args[0]]), function(data, deferred) {
    var message = data.content;
    var from = data.from;
    var users = haxfred.irc.users[data.message.args[0]];
    var person = message.match(detectUpvoteRegex(users))[0];

    haxfred.emit('irc.upvote',{
      recipient: person,
      sender: from
    });

    console.log("upvote");

    deferred.resolve();
  });


};

module.exports = haxfred_irc_upvote;
