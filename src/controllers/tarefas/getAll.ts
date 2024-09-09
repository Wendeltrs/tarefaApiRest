import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup'
import { validation } from "../../shared/middlewares";
import { tarefasProviders } from "../../database/providers/tarefas";

interface IQuery{
    id?: yup.Maybe<number | undefined>
    page?: yup.Maybe<number | undefined>
    limit?: yup.Maybe<number | undefined>
    filter?: yup.Maybe<string | undefined>
}

const getValidation: yup.ObjectSchema<IQuery> = yup.object().shape({
    id: yup.number().integer().default(0).notRequired(),
    filter: yup.string().notRequired(),
    page: yup.number().notRequired().moreThan(0),
    limit: yup.number().notRequired().moreThan(0)
})

export const getAllValidation = validation('query', getValidation)

export const getAll = async (req: Request<{}, {}, {}, IQuery>, res: Response) => {
    const result = await tarefasProviders.getAll(Number(req.query.page) || 1, Number(req.query.limit) || 10, String(req.query.filter) || '', Number(req.query.id))
    const count = await tarefasProviders.count(String(req.query.filter))

    if(result instanceof Error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        })
    }
    if(count instanceof Error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: count.message
            }
        })
    }

    res.setHeader('access-control-expose-headers', 'x-total-count')
    res.setHeader('x-total-count', count)

    return res.status(StatusCodes.OK).json(result)
}