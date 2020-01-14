exports.up = function(knex) {
  return knex.schema.createTable('posts', table => {
    table.increments();
    table.text('title');
    table.text('content');
    table.text('imageUrl');
    table.integer('createdBy');
    table
      .foreign('createdBy')
      .references('id')
      .inTable('users');
    table.timestamp('createdAt', { precision: 6 }).defaultTo(knex.fn.now(6));
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('posts');
};
