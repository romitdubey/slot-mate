const express = require('express');
const router =express.Router();

// User registration route
router.post('/signup', (req, res) =>{
    let {name, email, password, dateOfBirth} = req.body;
    name = name.trim();
    email = email.trim();
    password = password.trim();
    dateOfBirth = dateOfBirth.trim();

    if (name == "" || email == "" || password == "" || dateOfBirth == ""){
        res.json({
            status:"Failed",
            message: "Empty input field!"
        })
    }
    else if(!/^[a-zA-Z]+$/.test(name)){
        res.json({
            status: "FAILED",
            message: "Invalid name entered"})    }
    else if (!/^[\w-\.]+@([\w-]+\.))+[\w-]{2,4}$/.test(email)){
        res.json({
            status: "FAILED",
            message: "Invalid email entered"
        })
    }
})

// User login route
router.post('/login', (req, res) => {

})

module.exports = router;