import { RequestHandler } from "express"
import { StatusCodes } from "http-status-codes"
import { ObjectSchema, ValidationError } from "yup"


type TValidation = (field: 'params' | 'query' | 'header' | 'body',schema: ObjectSchema<any>) => RequestHandler

export const validation: TValidation = (field, schema) =>  async (req, res, next) => {
    try {
        await schema.validate(req[field], { abortEarly: false })
        return next()
    } catch (err) {
        const yupError = err as ValidationError
        const errors: Record<string, string> = {}

        yupError.inner.forEach(error => {
            if(!error.path) return
            errors[error.path] = error.message
        })

        return res.status(StatusCodes.BAD_REQUEST).json({
            errors
        })
    }
    
}