import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup'
import { validation } from "../../shared/middlewares";
import { tarefasProviders } from "../../database/providers/tarefas";

interface IParams{
    id?: yup.Maybe<number | undefined>
}

const deleteIdValidation: yup.ObjectSchema<IParams> = yup.object().shape({
    id: yup.number().integer().moreThan(0).notRequired()
})

export const deleteValidation = validation('params', deleteIdValidation)

export const deleteId = async (req: Request<IParams>, res: Response) => {
    if(!req.params.id){
        return res.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: 'Informe o "id"'
            }
        })
    }

    const result = await tarefasProviders.deleteId(Number(req.params.id))

    if(result instanceof Error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        })
    }

    return res.status(StatusCodes.NO_CONTENT).send()
}