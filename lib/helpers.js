function detectUpvote(message, usernames) {
  var regex = new RegExp('(\\s+|^)('+usernames.join('|') + ')' + '\\s?:?\\+');

  var users = message.match(regex);
  return users ? users[0] : false;
}
module.exports = {
  detectUpvote: detectUpvote
};
