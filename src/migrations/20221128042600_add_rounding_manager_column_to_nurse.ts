import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('nurses', function (table) {
    table.boolean('is_rounding_manager').defaultTo(false);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('nurses', function (table) {
    table.dropColumn('is_rounding_manager');
  });
}
