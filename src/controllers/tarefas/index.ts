import * as create from "./create";
import * as getAll from "./getAll";
import * as deleteId from "./delete";


export const tarefasControllers = {
    ...create,
    ...getAll,
    ...deleteId,
}