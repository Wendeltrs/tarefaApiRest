import { Knex } from "knex";
import { ETableNames } from "../ETableNames";


export async function up(knex: Knex) {
    return knex.schema.createTable(ETableNames.tarefas, table => {
        table.bigIncrements('id').primary().index()
        table.string('tarefa').index().notNullable()
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable(ETableNames.tarefas)
}