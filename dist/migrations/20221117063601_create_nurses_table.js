"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
function up(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        return knex.schema.createTable('nurses', function (table) {
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
            table.integer('user_id');
            table
                .foreign('user_id')
                .references('id')
                .inTable('users')
                .onDelete('SET NULL');
        });
    });
}
exports.up = up;
function down(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        return knex.schema.dropTable('nurses');
    });
}
exports.down = down;
