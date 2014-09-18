function detectUpvoteRegex(usernames) {
  var regex = new RegExp('\\b('+usernames.join('|') + ')' + '(?=\\s?:?\\s*\\+)');

      return regex;
}

function detectUpvote(message, regex) {
  var users = message.match(regex);
  return users ? users[0] : false;
}

module.exports = {
  detectUpvoteRegex: detectUpvoteRegex,
  detectUpvote: detectUpvote
};
