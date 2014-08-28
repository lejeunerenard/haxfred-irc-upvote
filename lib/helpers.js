function usersRegex(usernames) {
  var regex = new RegExp('\\b('+usernames.join('|') + ')' + '(?=\\s?:?\\s*\\+)');

      return regex;
}

function matchUser(message, regex) {
  var users = message.match(regex);
  return users ? users[0] : false;
}

module.exports = {
  usersRegex: usersRegex,
  matchUser: matchUser
};
