import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema
    .createTable('nurses', function (table) {
        table.increments().primary();
        table.string('full_name', 255).notNullable();
        table.string('contact', 255);
        table.string('working_days');
        table.string('start_time');
        table.string('end_time');
        table.string('address');
        table.string('image', 255);
        table.string('email').notNullable().unique();
        table.timestamps();
        table.integer("user_id");
        table
        .foreign("user_id")
        .references("id")
        .inTable("users")
        .onDelete("SET NULL");
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('nurses');
}

