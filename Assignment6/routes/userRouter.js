const express = require('express');
const router = express.Router();

// router.get('api/profile`', itemController.getItems);
// router.put('api/profile', itemController.addItem);
// router.put('api/users/:id/role', itemController.removeItem);



// - GET /api/public → Accessible by everyone
// - GET /api/protected → Authenticated users only
// - GET /api/moderator → Only for `moderator` and `admin`
// - GET /api/admin → Only for `admin`
// - GET /api/profile → Returns authenticated user's profile info
// - PUT /api/profile → Update `email` and `password`
// - PUT /api/users/:id/role → Admin-only: Update a user's role


router.post('/register', async (req, res) => {
    const { username, email, password, role } = req.body;
    try {
        const user = await CreateUser({ username, email, password, role });
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await LoginUser({ email, password });
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});



module.exports = router;