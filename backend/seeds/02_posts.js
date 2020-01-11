const posts = require('../sample_seeds/posts');

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('posts')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('posts').insert(posts);
    });
};
