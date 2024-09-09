"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
exports.router = (0, express_1.default)();
exports.router.get('/', (_, res) => {
    return res.send('Hello, World!');
});
exports.router.get('/task', controllers_1.tarefasControllers.getAllValidation, controllers_1.tarefasControllers.getAll);
exports.router.post('/task', controllers_1.tarefasControllers.createValidation, controllers_1.tarefasControllers.create);
exports.router.delete('/task/:id', controllers_1.tarefasControllers.deleteValidation, controllers_1.tarefasControllers.deleteId);
