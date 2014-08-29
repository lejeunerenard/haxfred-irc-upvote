var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var expect = require('chai').expect;
var assert = require('chai').assert;
var path = require('path');
var chai = require('chai');

var helpers = require('../lib/helpers');
var upvote = require('../lib/haxfred-irc-upvote');
var Haxfred = require('haxfred');

chai.use(expect);
chai.use(assert);
chai.use(sinonChai);


describe('Upvoting', function () {
  // Setup haxfred for tests
  var haxfred;
  beforeEach(function() {
    haxfred = new Haxfred({
      adapters: ['../node_modules/haxfred-irc/lib/haxfred-irc.js', 'haxfred-irc-upvote.js'],
      // Config is necessary to pass
      // @TODO determine how to deal with lack of config
      // haxfred-irc doesnt care if the server isnt defined.
      // It probably shouldnt care about the rest of its config.
      nicks: [ 'haxfred' ],
      channels: [
        '#foo'
      ],
      rootDir: path.resolve(__dirname, '../lib')
    });

    haxfred.initialize();
  });

   describe('detectUpvote()', function () {
      var usernames = ['alice', 'bob', 'charlie'];
      var regex = helpers.detectUpvoteRegex(usernames);

      it('detects username followed by a "+"', function () {
        var message = 'bob+';
        expect(helpers.detectUpvote(message, regex)).to.be.eq('bob');
      });
      it('detecs "username:" followed by a "+" ', function () {
        var message = 'bob:+';
        expect(helpers.detectUpvote(message, regex)).to.be.eq('bob');
      });
      it('detecs "username:", space character followed by a "+" ', function(){
        var message = 'bob	:+';
        expect(helpers.detectUpvote(message, regex)).to.be.eq('bob');
      });
      it('doesnt detect if there is anything between the username and "+"', function() {
        var message = 'bob	foo:+';
        expect(helpers.detectUpvote(message, regex)).to.not.be.ok;
      });
      it('detects if username starts with space', function () {
        var message = 'things   bob	:+';
        expect(helpers.detectUpvote(message, regex)).to.be.eq('bob');
      });
      it('detects if username doesnt start with space', function() {
        var message = 'thingbob	:+';
        expect(helpers.detectUpvote(message, regex)).to.not.be.ok;
      });
      it('detects with space after ":" and before "+"', function () {
        var message = 'bob:  +';
        expect(helpers.detectUpvote(message, regex)).to.be.eq('bob');
      });
   });
   describe('emit upvote event', function () {
     // Since we dont really want to setup the irc module for a test
      var usernames = ['alice', 'bob', 'charlie'],
          channel = "#foo";

     it('should emit an upvote event', function(done){
          var upvoteSpy = sinon.spy();
          setTimeout(function(){
            assert(upvoteSpy.called, 'Upvote event did not fire.');
            assert(upvoteSpy.calledOnce, 'Upvote fired more than once');
            done();
          }, 1000);
          haxfred.on('irc.upvote', upvoteSpy);
          
          haxfred.irc.users[channel] = usernames;
          haxfred.emit('irc.msg', {
             from: 'alice',
             content: 'bob: +',
             response: '',
             message: {content: 'hey', from: 'alice', args:['#foo']},
             onComplete: function() { }
          });

     });
     it('does not fire upvote event when upvote is detected from same user', function(done){
          var upvoteSpy = sinon.spy();
          setTimeout(function(){
            assert(!upvoteSpy.called, 'Upvote event did fire.');
            done();
          }, 1000);
          haxfred.on('irc.upvote', upvoteSpy);

          haxfred.irc.users[channel] = usernames;
          haxfred.emit('irc.msg', {
             from: 'alice',
             content: 'alice: +',
             response: '',
             message: {content: 'hey', from: 'alice', args:['#foo']},
             onComplete: function() { }
          });
     });  
   });
});
