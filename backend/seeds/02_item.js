/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex, Promise) {
  // Deletes ALL existing entries
  await knex('item').del()
  await knex('item').insert([
    {id: 1, user_id: '2', item_name: 'Mk 1 Survival Meal', description: 'The Mark 1 Survival Meal is a chewy, all-food-group granola brick consisting of rolled oats, nuts, dried meat, cheese, mixed fruit, and seaweed. The food brick is 2,500 calories and comes in a reusable container that purifies non-potable water.', quantity: '1'},
    {id: 2, user_id: '2', item_name: 'Bio Gel Injector', description: 'The Bio Gel Injector, or BGI (pronounced big-ee), is a massive amount of regeneration in a small canister with a gel applicator on one end and a thumb release at the opposing end. The foam absorbs DNA and reformulates to the necessary tissue type.', quantity: '1'},
  ]);
};