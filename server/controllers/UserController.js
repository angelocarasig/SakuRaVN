// Model
const User = require("../models/User");

// VNDB
const VNDB = require("vndb-api");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const getUser = async (req, res) => {
  res.send(res.user);
};

const addUser = (req, res) => {
  const vndb = new VNDB("clientname", {});

  vndb
    .query(`get user basic (id = ${req.params.id})`)
    .then((response) => {
      const userToAdd = new User({
        id: response.items[0].id,
        username: response.items[0].username,
      });

      try {
        const newUser = userToAdd.save();
        res.status(201).json(newUser);
      } catch (e) {
        res.status(400).json({ message: e.message });
      }
    })
    .catch((e) => {
      console.log(e);
    });
};

// Only updates username as the other value is primary
const updateUser = (req, res) => {
  const vndb = new VNDB("clientname", {});

  vndb
    .query(`get user basic (id = ${req.params.id})`)
    .then((response) => {
      const userToUpdate = new User({
        id: response.items[0].id,
        username: response.items[0].username,
      });
      console.log(userToUpdate.username);
      console.log(userToUpdate.id);

      try {
        const updatedUser = User.updateMany(
          { id: userToUpdate.id },
          { $set: { username: userToUpdate.username } }
        );
        res.send("User has been updated.");
      } catch (e) {
        res.status(400).json({ message: e.message });
      }
    })
    .catch((e) => {
      console.log(e);
    });
};

const deleteUser = async (req, res) => {
  try {
    await User.deleteMany({ id: res.user.id });
    res.status(200).json({ message: "User has been removed." });
  } catch (e) {
    res.status(500).json({ message: "User could not be removed." });
  }
};

async function searchUser(req, res, next) {
  let user;
  try {
    user = await User.find({ id: req.params.id });
    if (user == null) {
      return res.status(404).json({ message: "User does not exist." });
    }
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }

  // Returns array with only 1 element
  res.user = user[0];
  next();
}

const getUserList = async (req, res) => {
  const vndb = new VNDB("clientname", {});
  
  let userList = [];
  let pagination = 1;
  let searchingUser = true;

  while (searchingUser) {
    await vndb.query(`get ulist basic (uid=${req.params.id}) {"page": ${pagination}, "results":100}`)
      .then((response) => {
        userList.push(...response.items);

        if (response.more === true) {
          pagination++;
        }
        else {
          searchingUser = false;
        }
      })
      .catch ((e) => {
        res.status(500).json({message: e.message});
      })
  }

  vndb.destroy();

  res.status(200).json(userList);
};

module.exports = {
  searchUser,
  getAllUsers,
  getUser,
  getUserList,
  addUser,
  updateUser,
  deleteUser,
};
