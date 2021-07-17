import express from 'express'
import { body, validatorResult } from 'express-validator'
import { create, deleteUser, getUsers, updateUser, getUser } from '../../controllers/UserController'
const router = express.Router()

router.get('/', getUsers);
router.post('/', 
    body('email').isEmail().normalizeEmail(), 
    create
);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router