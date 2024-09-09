import * as create from "./create";
import * as getAll from "./getAll";
import * as deleteId from "./delete";
import * as count from './counts'


export const tarefasProviders = {
    ...create,
    ...getAll,
    ...deleteId,
    ...count
}