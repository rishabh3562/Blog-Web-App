const app = require('express')
const router = app.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
console.log(`new auth.js`);
// app.use(express.json());
// Register new user
router.post('/register', async (req, res) => {
    try {

        const savedUser = await req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({
            username: savedUser.username,
            email: savedUser.email,
            password: hashedPassword,
        });
        // Send response with saved user object
        const user = await newUser.save();
        console.log(`newUser in backend/auth/register`, newUser);
        console.log(`user in backend/auth/register`, user);
        res.status(200).send(user);
    } catch (error) {
        // Log error to console and send error message to client
        console.log('Error saving user:', error.message);
        res.send({ error: 'Error saving user' });
    }
});

//LOGIN
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        !user && res.status(400).json("Wrong credentials!");

        const validated = await bcrypt.compare(req.body.password, user.password);
        !validated && res.status(400).json("Wrong credentials!");

        const { password, ...others } = user._doc;
        res.status(200).json(others);
    } catch (err) {
        res.status(500).json(err);
    }
});



module.exports = router;
