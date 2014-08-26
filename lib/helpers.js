function detectUpvote(message, usernames) {
  var regex = new RegExp('\\b('+usernames.join('|') + ')' + '(?=\\s?:?\\s*\\+)');

  // Get the users name as the first element
  var users = message.match(regex);
  return users ? users[0] : false;
}

module.exports = {
  detectUpvote: detectUpvote
};
