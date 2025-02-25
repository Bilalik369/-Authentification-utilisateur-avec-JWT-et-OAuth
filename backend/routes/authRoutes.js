const express = require('express');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const User = require('../models/User');


const router = express.Router();


// inscription 

router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ message: 'Utilisateur déjà existant' });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ name, email, password: hashedPassword });
      res.status(201).json({ _id: user.id, name: user.name, email: user.email });
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de l’inscription' });
    }
  });