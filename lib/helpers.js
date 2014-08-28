function detectUpvoteRegex(usernames) {
  var regex = new RegExp('\\b('+usernames.join('|') + ')' + '(?=\\s?:?\\s*\\+)');

      return regex;
}

module.exports = {
  detectUpvoteRegex: detectUpvoteRegex
};
