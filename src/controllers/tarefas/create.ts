import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup'
import { validation } from "../../middlewares";
import { ITask } from "../../database/model";
import { tarefasProviders } from "../../database/providers/tarefas";

interface IBody extends Omit<ITask, 'id'>{
    tarefa: string
}

const bodyValidation: yup.ObjectSchema<IBody> = yup.object().shape({
    tarefa: yup.string().min(3).required()
})

export const createValidation = validation('body', bodyValidation)

export const create = async (req: Request<{}, {}, IBody>, res: Response) => {
    const result = await tarefasProviders.create(req.body)

    if(result instanceof Error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        })
    }

    return res.status(StatusCodes.CREATED).json(result)
}