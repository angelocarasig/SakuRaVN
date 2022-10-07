// Model
const User = require("../models/User");

// VNDB
const VNDB = require("vndb-api");
const vndb = new VNDB("clientname", {});

const getAllUsers = async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } 
    catch (e) {
      res.status(500).json({ message: e.message });
    }
};

const getUser = async (req, res) => {
    try {
        const user = await User.find({"id": req.params.id});
        if (user == null) {
            return res.status(404).json({message: "User not found."});
        } 
        res.send(user);
      } 
      catch (e) {
        return res.status(500).json({ message: e.message });
      }
}

const addUser = (req, res) => {

    vndb.query(`get user basic (id = ${req.params.id})`)
    .then((response) => {
        const userToAdd = new User({
            id: response.items[0].id,
            username: response.items[0].username
        });

        try {
            const newUser = userToAdd.save();
            res.status(201).json(newUser);
        }
        catch (e) {
            res.status(400).json({ message: e.message });
        }
    })
    .catch((e) => {console.log(e)});
}

module.exports = {
    getAllUsers,
    getUser,
    addUser
}