const userCtrl = {};

const jwt = require("jsonwebtoken");
const config = require('../keys.js');
const crypt = require('./crypt.controller');

const bbdd = require("../database");

userCtrl.getUsers = async (req, res) => {
    bbdd.getConnection(function (err, connection) {
        if (err) throw err;

        console.log("Connection successful");
        connection.query('SELECT * from users', function (error, results, fields) {
            
            connection.release();
            console.log("Connection released");
            res.status(200).send(results);

            if (error) throw error;
        });
    });
};

userCtrl.createUser = async (req, res) => {
    const newUser = new User(req.body);
    newUser.password = await crypt.encryptPassword(newUser.password);
    newUser.name = await crypt.encryptText(newUser.name);
    newUser.lastname = await crypt.encryptText(newUser.lastname);
    newUser.email = await crypt.encryptText(newUser.email);
    await newUser.save();

    const token = jwt.sign({
        _id: newUser._id
    }, config.SECRET_KEY);
    res.status(200).send({
        token
    });
};

userCtrl.checkUser = async (req, res) => {
    const userExists = await User.find({
        username: req.params.username
    }, {
        _id: 0,
        username: 1
    });
    if (userExists.length > 0) {
        res.status(200).send({
            status: "true",
            message: "User already exists"
        });
    } else {
        res.status(200).send({
            status: "false",
            message: "User does not exist"
        });
    }
};

userCtrl.getUser = async (req, res) => {
    const user = await User.findById({
        _id: req.params.id
    }, {
        _id: 1,
        username: 1,
        name: 1,
        lastname: 1,
        email: 1,
        createdAt: 1,
        updatedAt: 1
    });

    user.name = await crypt.decryptText(user.name);
    user.lastname = await crypt.decryptText(user.lastname);
    user.email = await crypt.decryptText(user.email);

    res.status(200).send(user);
};

userCtrl.editUser = async (req, res) => {
    const user = new User();

    user._id = req.body._id;
    user.username = req.body.username;
    user.name = await crypt.encryptText(req.body.name);
    user.lastname = await crypt.encryptText(req.body.lastname);
    user.email = await crypt.encryptText(req.body.email);

    await User.findByIdAndUpdate(req.params.id, user);
    res.status(200).json({
        status: "OK",
        message: "User updated"
    });
};

userCtrl.deleteUser = async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({
        status: "OK",
        message: "User deleted"
    });
};

module.exports = userCtrl;