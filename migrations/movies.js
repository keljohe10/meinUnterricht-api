exports.up = (knex) =>
  knex.schema.createTable('movies', (table) => {
    table.increments();
    table.string('name').unique();
    table.timestamps(true, true);
  });

exports.down = (knex) => knex.schema.dropTable('movies');
