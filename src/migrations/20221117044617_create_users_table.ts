import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema
    .createTable('users', function (table) {
        table.increments().primary();
        table.string('first_name', 255).notNullable();
        table.string('last_name', 255).notNullable();
        table.string('name').notNullable().unique();
        table.string('email').notNullable().unique();
        table.string('password').notNullable();
        table.timestamps();
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('users');
}

