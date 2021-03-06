
/*!
 * Module dependencies.
 */

var async = require('async')

/**
 * Controllers
 */

var users = require('../app/controllers/users')
  , articles = require('../app/controllers/articles')
  , auth = require('./middlewares/authorization')

/**
 * Route middlewares
 */

var articleAuth = [auth.requiresLogin, auth.article.hasAuthorization]

/**
 * Expose routes
 */

module.exports = function (app, passport) {

  // // user routes
  // app.get('/login', users.login)
  // app.get('/signup', users.signup)
  // app.get('/logout', users.logout)
  app.post('/users', users.create)
  // app.post('/users/session',
  //   passport.authenticate('local', {
  //     failureRedirect: '/login',
  //     failureFlash: 'Invalid email or password.'
  //   }), users.session)

  app.post('/users/session', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
      if (err) { return next(err) }
      if (!user) {

        return res.send({'errors': info.message })

      }
      req.logIn(user, function(err) {
        if (err) { return next(err); }
        return res.send({'success': true, 'user': user});
        //return res.redirect('/users/' + user.email);
      });
    })(req, res, next);
  });

  app.del('/users/session', users.logout);

  app.get('/users/:userId', users.show)
  app.get('/auth/facebook',
    passport.authenticate('facebook', {
      scope: [ 'email', 'user_about_me'],
      failureRedirect: '/login'
    }), users.signin)
  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
      failureRedirect: '/login'
    }), users.authCallback)
  // app.get('/auth/github',
  //   passport.authenticate('github', {
  //     failureRedirect: '/login'
  //   }), users.signin)
  // app.get('/auth/github/callback',
  //   passport.authenticate('github', {
  //     failureRedirect: '/login'
  //   }), users.authCallback)
  // app.get('/auth/twitter',
  //   passport.authenticate('twitter', {
  //     failureRedirect: '/login'
  //   }), users.signin)
  // app.get('/auth/twitter/callback',
  //   passport.authenticate('twitter', {
  //     failureRedirect: '/login'
  //   }), users.authCallback)
  // app.get('/auth/google',
  //   passport.authenticate('google', {
  //     failureRedirect: '/login',
  //     scope: [
  //       'https://www.googleapis.com/auth/userinfo.profile',
  //       'https://www.googleapis.com/auth/userinfo.email'
  //     ]
  //   }), users.signin)
  // app.get('/auth/google/callback',
  //   passport.authenticate('google', {
  //     failureRedirect: '/login'
  //   }), users.authCallback)

  app.param('userId', users.user)

  // // article routes
  // app.get('/articles', articles.index)
  // app.get('/articles/new', auth.requiresLogin, articles.new)
  // app.post('/articles', auth.requiresLogin, articles.create)
  // app.get('/articles/:id', articles.show)
  // app.get('/articles/:id/edit', articleAuth, articles.edit)
  // app.put('/articles/:id', articleAuth, articles.update)
  // app.del('/articles/:id', articleAuth, articles.destroy)

  // app.param('id', articles.load)

  // // home route
  // var web = require('../app/controllers/web')
  // app.get('/', web.index)
  
  // app.get('/test', function(req, res){
  //   res.redirect('http://cdn.inx.io/uploads/18.jpg')
  // })

  // // comment routes
  // var comments = require('../app/controllers/comments')
  // app.post('/articles/:id/comments', auth.requiresLogin, comments.create)

  // // tag routes
  // var tags = require('../app/controllers/tags')
  // app.get('/tags/:tag', tags.index)
  
  var shortener = require('../app/controllers/shortener')
  app.get('/shortener', shortener.fetch)

  var pictures = require('../app/controllers/pictures')

  app.get('/i/:shortlink', pictures.fetchShort)
  app.get('/w/:word', pictures.fetch)


}
