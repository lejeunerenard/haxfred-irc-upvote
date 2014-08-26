var helpers = require('./helpers');

var haxfred_irc_upvote = function(haxfred) {
  var users = [];
  
  // Collection of listeners to update user array
  haxfred.irc.client.addListener('names', function(channel, nicks) {
    users = [];
    for(var n in nicks) {
      users.push(n);
    }
  });

  haxfred.irc.client.addListener('join', function(channel, nick) {
    users.push(nick);
  });

  haxfred.irc.client.addListener('part', function(channel, nick) {
    var index = users.indexOf(nick);
    if (index > -1) {
      users.splice(index, 1);
    }
  });

  haxfred.on('irc.msg', '', function(data, deferred) {

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
