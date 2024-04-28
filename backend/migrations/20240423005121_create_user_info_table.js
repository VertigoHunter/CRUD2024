/**
 * @param { import("knex").Knex } knex
//  * @returns { Promise<void> }
 */
exports.up = function(knex, Promise) {
  return knex.schema.createTable('user_info', table => {
    table.increments('id').primary();
    table.string('first_name', 30);
    table.string('last_name', 30);
    table.string('user_name', 30);
    table.string('password', 30);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('user_info');
};