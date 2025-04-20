const express = require('express');
const router = express.Router();
const { CreateUser, LoginUser, GetUserById, UpdateUser, UpdateUserByRole} = require('../users');
const { authentication } = require('../middleware/authentication');
const { authorization } = require('../middleware/authorization');
const { ValidateEmail, ValidatePassword } = require('../users');
const rateLimit = require('express-rate-limit');


// - GET /api/public → Accessible by everyone
// - GET /api/protected → Authenticated users only
// - GET /api/moderator → Only for `moderator` and `admin`
// - GET /api/admin → Only for `admin`
// - GET /api/profile → Returns authenticated user's profile info
// - PUT /api/profile → Update `email` and `password`
// - PUT /api/users/:id/role → Admin-only: Update a user's role


const myRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 3, 
    message: { error: 'Too many attempts, please try again later' }
})


router.post('/register', myRateLimiter, async (req, res) => {
    const { username, email, password, role } = req.body;
    try {
        const user = await CreateUser({ username, email, password, role });
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.post('/login', myRateLimiter, async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await LoginUser( username, password );
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/profile', authentication, async (req, res) => {
    try {
        const user = await GetUserById( req.user.id );
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });s
    }
});


router.put('/profile', authentication, async (req, res) => {
    const {id, email, password } = req.body;

    if(ValidateEmail(email) && ValidatePassword(password)){
        try {
            const user = await UpdateUser( id, { email, password });
            res.status(201).json(user);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    else{
        res.status(400).json({ error: 'Recheck your email or password' });
    }
    
});

router.put('/users/:id/role', authentication, authorization('admin'), async (req, res) => {
    const { role } = req.body;
    const id = parseInt(req.params.id);
    try {
        const user = await UpdateUserByRole(id, {role});
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});




module.exports = router;