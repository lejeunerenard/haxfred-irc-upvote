var Haxfred,
    helpers = require('./helpers.js');

var habit_irc_upvote = function(haxfred) {
  Haxfred = haxfred;




  haxfred.on('irc.msg', '', function(data, deferred) {
    var from = data.from,
        message = data.content;



    console.log("attempting to emit upvote");
    haxfred.emit('irc.upvote',{
      user: user
    });
    console.log("emitted");

    deferred.resolve();
  });


};

module.exports = haxfred_irc_upvote;
