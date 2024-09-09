import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";


export const deleteId = async (id: number): Promise<void | Error> => {
    try {
        const result = await Knex(ETableNames.tarefas)
            .where('id', '=', id)
            .del()
        
        if(result > 0) return

        return new Error('Erro ao deletar!')
    } catch (error) {
        console.log(error)
        return new Error('Erro ao deletar!')
    }
}