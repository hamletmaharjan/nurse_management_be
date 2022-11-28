import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.
    alterTable('users', function(table) {
        table.dropColumn('first_name');
        table.dropColumn('last_name');
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema
    .alterTable('users', function (table) {
        table.string('first_name', 255).notNullable();
        table.string('last_name', 255).notNullable();
    })
}

