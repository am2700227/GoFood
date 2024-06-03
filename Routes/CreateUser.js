const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');

const jwt=require("jsonwebtoken");

const bcrypt= require('bcryptjs');
 const jwtSecret="Mynameisankitmishfrfadoingthins"


router.post("/createuser",
    [
        body('email').isEmail(),
        body('name').isLength({ min: 5 }),
        body('password', 'incorrect password').isLength({ min: 5 })
    ], async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }


        const salt=await bcrypt.genSalt(10)
        let secPassword=await bcrypt.hash(req.body.password,salt)

        try {
            // Fix the field name to match client-side
            // const { name, password, email, geolocation } = req.body;

            await User.create({
                name:req.body.name,
                password:secPassword,
                email:req.body.email,
                location: req.body.location // Fix the field name
            });

            res.json({ success: true });

        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, error: "Internal server error" });
        }
    });

//for login user
router.post("/loginuser", [
    body('email').isEmail(),
    body('password', 'Password must be at least 5 characters long').isLength({ min: 5 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { password, email } = req.body;

        // Find user by email
        let userData = await User.findOne({ email });
        if (!userData) {
            return res.status(400).json({ errors: "Invalid credentials" });
        }


        // Compare passwords
        const pwdcmpr= bcrypt.compare(password,userData.password)
        if (!pwdcmpr) {
            return res.status(400).json({ errors: "Invalid credentials" });
        }

        const data={
            user:{
                id:userData.id
            }
        }
        const authToken=jwt.sign(data,jwtSecret);

        return res.json({ success: true,authToken :authToken});
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
});

module.exports = router;
