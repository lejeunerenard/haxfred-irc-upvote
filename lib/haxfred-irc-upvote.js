var helpers = require('./helpers');

var haxfred_irc_upvote = function(haxfred) {
  var users = [];
  
  helpers.getUsers(haxfred, users);

  haxfred.on('irc.msg', '', function(data, deferred) {

    // Temporary - Needs to get a list of people in the chat room and put them in an array
    var users = ["BladeBarringer", "lejeunerenard"];

    var message = data.content,
        upvoteName = helpers.detectUpvote(message, users);

    if(upvoteName) {
      haxfred.emit('irc.upvote',{
        recipient: upvoteName
      });
    }

    deferred.resolve();
  });


};

module.exports = haxfred_irc_upvote;
