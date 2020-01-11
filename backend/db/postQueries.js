const knex = require('./knex');

module.exports = {
  getAll: function() {
    return knex('posts');
  },
  getOne: function(id) {
    return knex('posts')
      .where('id', id)
      .first();
  },
  create: function(post) {
    return knex('posts').insert(post, '*');
  },
  update: function(id, post) {
    return knex('posts')
      .where('id', id)
      .update(post, '*');
  },
  delete: function(id) {
    return knex('posts')
      .where('id', id)
      .del();
  }
};
