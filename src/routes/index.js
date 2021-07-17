import { Router } from 'express';
const router = Router()

// GET home page
router.get('/', (req, res, next) => {
    res.send("<h1>INDEX PAGE</h1>");
})

export default router