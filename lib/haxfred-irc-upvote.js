var helpers = require('./helpers');

var haxfred_irc_upvote = function(haxfred) {
  haxfred.on('irc.msg', '', function(data, deferred) {

    // Temporary - Needs to get a list of people in the chat room and put them in an array
    var users = ["BladeBarringer", "lejeunerenard"];

    var message = data.content,
        from = data.from,
        upvoteName = helpers.detectUpvote(message, users);

    if(upvoteName && from != upvoteName) {
      haxfred.emit('irc.upvote',{
        recipient: upvoteName,
        sender: from
      });
    }

    deferred.resolve();
  });


};

module.exports = haxfred_irc_upvote;
