import express from 'express'
import bcrypt from 'bcrypt'
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
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
});

router.post('/', [
  check('firstname', 'The firstname field can not be empty').notEmpty().trim(),
  check('lastname', 'The lastname field can not be empty').notEmpty().trim(),
  check('email', 'Enter a correct email').isEmail().normalizeEmail(),
  check('password', 'Invalid password').isLength({ min: 4 })
], async (req, res, next) => {

  try {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      const user = User(req.body);
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
      
      await user.save().then(response => {
        res.status(201).json({ message: "Created", data: response})

      });
    }
    else {
      return res.status(400).json({
          success: false,
          errors: errors.array()
      });
    } 
  } catch (error) {
    res.status(404).json({ message: error.message})
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
        user.save().then(response => {
          res.status(200).json({ message: "updated", data: response})

        });

      }
      
    } catch (error) {
      res.status(404).json({ error: error.message})
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "deleted", data: user})
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
});

export default router