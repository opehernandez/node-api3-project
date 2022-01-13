const Users = require('../users/users-model')
function logger(req, res, next) {
  // DO YOUR MAGIC
}

function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  Users.getById(req.params.id)
    .then(user => {
      if(!user) {
        const err = {status: 404, message: `user not found`}
        next(err)
      }
      else { 
        req.user = user
        next() 
      }
    })
    .catch(err => {
      next(err)
    })
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  const { name } = req.body
  if(!name) {
    const err = {status: 400, message: "missing required name field"}
    next(err)
  }
  else {
    next()
  }
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  const { text } = req.body
  if(!text) {
    const err = {status: 400, message: "missing required text field"}
    next(err)
  }
  else { next() }
}

function errorHandler(err, req, res, next) {
  res.status(err.status || 500).json({message: err.message})
}

module.exports = {
  logger,
  validatePost,
  validateUser,
  validateUserId,
  errorHandler
}

// do not forget to expose these functions to other modules
