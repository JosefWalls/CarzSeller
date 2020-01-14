const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcryptjs")

    router.route("/account/signup").post((req, res) => {
        const {firstName, lastName, email, password} = req.body;
        if(!firstName){
            res.send("Error: Missing field")
        }
        if(!lastName){
            res.send("Error: Missing field")
        }
        if(!email){
            res.send("Error: Missing field")
        }
        if(!password){
            res.send("Error: Missing field")
        }

        const newEmail = email.toLowerCase();

        User.find({
            email: newEmail
        }, (err, previousUser) => {
            if(err){
                res.send("Error: Somthing went wrong")
            } else if (previousUser.length> 0) {
                res.send("Error: Account already created")
            }

            const newUser = new User();
            newUser.email = newEmail;
            newUser.firstName = firstName;
            newUser.lastName = lastName;
            newUser.password = newUser.generateHash(password);
            newUser.save((err, user) => {
                if(err){
                    res.end("Error: Server error")
                }
                res.end("Signed up")
            })
        })
    })
    
    router.route("/account/signin").post((req, res) => {
        const {email, password} = req.body;
    if (!email) {
        return res.send("Missing input field");
    }
    if (!password) {
      return res.send("Missing input field");
    }
    const lowerEmail = email.toLowerCase();
    User.find({
      email: lowerEmail
    }, (err, users) => {
      if (err) {
        return res.send("Server error");
      }
      if (users.length != 1) {
        return res.send("Invalid login");
      }
      const user = users[0];
      if (!user.validPassword(password)) {
        return res.send("Invalid login");
      }
      req.session.user = {
        email: user.email,
        profileImg: user.profileImg,
        userId: user._id,
        loggedIn: true
      }
      res.status(200).json(req.session.user)
    });
    });

    module.exports = router;