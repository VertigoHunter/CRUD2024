/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('user_info').del()
  await knex('user_info').insert([
    {id: 1, first_name: 'Generic', last_name: 'Viewer', user_name: 'Guest', password: 'nerfed'},
    {id: 2, first_name: 'Generic', last_name: 'Manager', user_name: 'Manager', password: 'buffed'},
  ]);
};