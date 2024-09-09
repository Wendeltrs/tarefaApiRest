import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { ITask } from "../../model";


export const create = async (tarefa: Omit<ITask, 'id'>): Promise<number | Error> => {
    try {
        const [result] = await Knex(ETableNames.tarefas).insert(tarefa).returning('id')
        
        if(typeof result == 'object'){
            return result.id
        }
        if(typeof result == 'number'){
            return result
        }

        return new Error('Erro ao cadastrar!')
    } catch (error) {
        console.log(error)
        return new Error('Erro ao cadastrar!')
    }
}