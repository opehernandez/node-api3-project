const express = require('express');
const Users = require('./users-model')
const Posts = require('../posts/posts-model')
const { errorHandler, validatePost, validateUser, validateUserId, logger } = require('../middleware/middleware')
// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();

router.get('/', (req, res) => {
  Users.get()
    .then(users => {
      res.status(200).json(users)
    })
});

router.get('/:id', validateUserId, (req, res) => {
  res.json(req.user)
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
});

router.post('/', validateUser, (req, res, next) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  Users.insert(req.body)
    .then(userCreated => {
      res.status(201).json(userCreated)
    })
    .catch(err => {
      next(err)
    })
  // this needs a middleware to check that the request body is valid
});

router.put('/:id', validateUserId, validateUser, (req, res, next) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  Users.update(req.params.id, req.body)
    .then(userUpdated => {
      res.json(userUpdated)
    })
    .catch(err => {
      next(err)
    })
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.delete('/:id', validateUserId, (req, res, next) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  Users.remove(req.params.id)
    .then(userDeleted => {
      res.json(req.user)
    })
    .catch(err => {
      next(err)
    })
});

router.get('/:id/posts', validateUserId, (req, res, next
  ) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  Posts.getById(req.params.id)
    .then(userPost => {
      res.status(200).json(userPost)
    })
    .catch(err => {
      next(err)
    })
});

router.post('/:id/posts', validateUserId, validatePost, (req, res, next) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  req.body.user_id = req.user.id
  Posts.insert(req.body)
    .then(postCreated => {
      res.status(201).json(postCreated[0])
    })
    .catch(err => {
      next(err)
    })
});

router.use(errorHandler)

// do not forget to export the router
module.exports = router