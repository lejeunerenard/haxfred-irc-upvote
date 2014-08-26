function detectUpvote(message, usernames) {
  var regex = new RegExp('\\b('+usernames.join('|') + ')' + '(?=\\s?:?\\s*\\+)');

  // Get the users name as the first element
  var users = message.match(regex);
  return users ? users[0] : false;
}

// Collection of listeners to update user array
function getUsers(haxfred, users) {

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

}

module.exports = {
  detectUpvote: detectUpvote,
  getUsers: getUsers
};
