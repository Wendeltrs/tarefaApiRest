import { ITask } from "../../model";

declare module 'knex/types/tables'{
    interface Tables{
        task: ITask
    }
}