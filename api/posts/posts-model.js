const db = require('../../data/db-config');

module.exports = {
  get,
  getById,
  insert,
  update,
  remove,
};

function get(id) {
  return db('posts')
    .where({ id })
}

function getById(id) {
  return db('posts')
    .where({'user_id' : id})
}

function insert(post) {
  return db('posts')
    .insert(post)
    .then(ids => {
      return get(ids[0]);
    });
}

function update(id, changes) {
  return db('posts')
    .where({ id })
    .update(changes);
}

function remove(id) {
  return db('posts')
    .where('id', id)
    .del();
}
