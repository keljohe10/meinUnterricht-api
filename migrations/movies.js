exports.up = (knex) =>
  knex.schema.createTable('movies', (table) => {
    table.increments();
    table.string('title').notNullable();
    table.string('year').notNullable();
    table.string('imbd_id').unique();
    table.string('director');
    table.text('plot');
    table.string('poster');
    table.timestamps(true, true);
  });

exports.down = (knex) => knex.schema.dropTable('movies');
