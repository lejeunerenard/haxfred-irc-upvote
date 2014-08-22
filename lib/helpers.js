function detectUpvote(message, usernames) {
  var regex = new RegExp('(\\s+|^)('+usernames.join('|') + ')' + '\\s?:?\\+');

  var users = message.match(regex);
  var user = users ? users[0] : false;

  if(user) {
    var posColon = user.indexOf(":");
    
    if(posColon > -1) {
      user = user.substring(0, posColon).trim();
    } else {
      var posPlus = user.indexOf("+");
      user = user.substring(0, posPlus).trim();
    }
  }

  return user;
}


module.exports = {
  detectUpvote: detectUpvote
};
