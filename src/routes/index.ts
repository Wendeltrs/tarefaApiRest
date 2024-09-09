import express from 'express'
import { tarefasControllers } from '../controllers'

export const router = express()

router.get('/', (_, res) => {
    return res.send('Hello, World!')
})

router.get('/task', tarefasControllers.getAllValidation, tarefasControllers.getAll)
router.post('/task', tarefasControllers.createValidation, tarefasControllers.create)
router.delete('/task/:id', tarefasControllers.deleteValidation, tarefasControllers.deleteId)