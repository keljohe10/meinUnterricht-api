exports.seed = async (knex, Promise) => {
  await knex.raw('TRUNCATE TABLE movies RESTART IDENTITY CASCADE');
  return await knex('movies').then(() => knex('movies').insert([{ name: 'Space' }]));
};
