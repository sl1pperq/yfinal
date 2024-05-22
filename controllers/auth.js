const path = require("path");
const {model} = require("mongoose");
const jwt = require("jsonwebtoken");
const userSchema = require("../models/user");

userSchema.statics.findUserByCredentials = function (email, password) {
    return this.findOne({email})
        .then(user => {
            if (!user) {
                return Promise.reject(new Error("Неправильные почта или пароль"));
            }

            return bcrypt.compare(password, user.password).then(matched => {
                if (!matched) {
                    return Promise.reject(new Error("Неправильные почта или пароль"));
                }

                return user;
            });
        });
};

const login = (req, res) => {
    const {email, password} = req.body;

    users
        .findUserByCredentials(email, password)
        .then((user) => {
            const token = jwt.sign({_id: user._id}, "some-secret-key", {
                expiresIn: 3600
            });
        })
        .catch(error => {
            res.status(401).send({message: error.message});
        });
};


const sendIndex = (req, res) => {
    if (req.cookies.jwt) {
        try {
            jwt.verify(req.cookies.jwt, "some-secret-key");
            return res.redirect("/admin/dashboard");
        } catch (err) {
            res.sendFile(path.join(__dirname, "../public/index.html"));
        }
    }
    res.sendFile(path.join(__dirname, "../public/index.html"));
};

const sendDashboard = (req, res) => {
    res.sendFile(path.join(__dirname, "../public/admin/dashboard.html"));
};

module.exports = model("user", userSchema);
module.exports = {
    sendDashboard,
    sendIndex,
    login
}
