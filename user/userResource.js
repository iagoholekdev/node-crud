// user/resource/userResource.js

const express = require('express');
const router = express.Router();
const User = require('./model/user');
const UserDTO = require('./dto/userdto');

const AbstractCrud = require('../utils/abstractClasses/abstractCrud');

const userCrud = new AbstractCrud(User);

router.use(express.json());

router.post('/users/create', async (req, res) => {
    try {
        const newUser = await userCrud.create(req.body); 
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/users', async (req, res) => {
    try {
        const users = await userCrud.readAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/users/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await userCrud.read(userId);
        res.json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.put('/users/:id', async (req, res) => {
        try {
            const userId = req.params.id;
            const updatedUser = await userCrud.update(userId, req.body);
            res.json(updatedUser);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
});

router.delete('/users/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        await userCrud.delete(userId);
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/users/search/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const users = await userCrud.readByField('id', userId);

        if (!users || users.length === 0) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        const user = users[0];

        const userDTO = new UserDTO(user.id, user.firstName);

        res.status(200).json(userDTO);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
module.exports = router;
