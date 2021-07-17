import express from 'express'
import { check, validationResult } from 'express-validator'
import User from '../models/User'
const router = express.Router()


// GET home page
router.get('/', async (req, res, next) => {

    const users = await User.find() 
    res.status(200).json(users);
});

router.get('/:id', async (req, res, next) => {

    try {
        const user = await User.findById(req.params.id);
        res.status(200).json({ message: "added", data: user})    
    } catch {
        res.status(404).json({ error: "User not found"})
    }
});

router.post('/', [
  check('firstname', 'The firstname field can not be empty').notEmpty().trim(),
  check('lastname', 'The lastname field can not be empty').notEmpty().trim(),
  check('email', 'Enter a correct email').isEmail().normalizeEmail()
], async (req, res, next) => {

    const errors = validationResult(req);

    if (errors.isEmpty()) {
      const user = User(req.body);
      await user.save();
      res.status(201).json({ message: "Created", data: user})
    }
    else {
      return res.status(400).json({
          success: false,
          errors: errors.array()
      });
    }   
});

router.put('/:id', [
  check('firstname', 'The firstname field can not be empty').notEmpty().trim(),
  check('lastname', 'The lastname field can not be empty').notEmpty().trim(),
  check('email', 'Enter a correct email').isEmail().normalizeEmail()
], async (req, res, next) => {
    try {
      const errors = validationResult(req);

      if (errors.isEmpty()) {
        const user = await User.findById(req.params.id);
        Object.assign(user, req.body);
        user.save();

        res.status(200).json({ message: "updated", data: user})
      }
      
    } catch {
      res.status(404).json({ error: "User not found"})
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "deleted", data: user})
    } catch {
        res.status(404).json({ error: "User not found"})
    }
});

export default router