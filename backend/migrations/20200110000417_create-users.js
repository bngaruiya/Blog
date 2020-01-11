exports.up = function(knex) {
  return knex.schema.createTable('users', table => {
    table.increments();
    table.text('firstName');
    table.text('lastName');
    table.text('email');
    table.text('password');
    table.text('imageUrl');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
