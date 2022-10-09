// Model
const User = require("../models/User");

// VNDB
const VNDB = require("vndb-api");
const UserException = require("../exceptions/UserException");

const getUserNovels = async (req, res) => {
  res.json(res.ulist);
}

// Needs Middleware Function searchUser() in UserController
const updateUserNovels = async (req, res) => {

  const userToUpdate = new User({
      id: res.user.id,
      username: res.user.username,
      vnlist: res.ulist,
  });

  try {
      console.error("reached here 1");
      await User.deleteMany({ id: res.user.id });
      console.error("reached here 2");
      const newUser = userToUpdate.save();
      res.status(201).json({message: `Updated UserList for User ${res.user.id}`});
  }
  catch (e) {
      res.status(400).json({ message: e.message });
  }
};

// Middleware Functions
async function _getUserList(req, res, next) {

    let user = await User.find({ id: req.params.id });
    
    if (user.length <= 0) {
      next(UserException.UserNotFound());
      return;
    }

    const vndb = new VNDB("clientname", {});
    
    let userList = [];
    let pagination = 1;
    let searchingUser = true;
  
    while (searchingUser) {
      console.log("Looking for page " + pagination);
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

    
    res.user = user[0];

    // Date Conversion
    for (let i = 0; i < userList.length; i++) {
        if (userList[i].started != null ) {
            let date = new Date(userList[i].started * 1000);
            userList[i].started = date;
        }

        if (userList[i].finished != null ) {
            let date = new Date(userList[i].finished * 1000);
            userList[i].finished = date;
        }
        
        if (userList[i].added != null ) {
            let date = new Date(userList[i].added * 1000);
            userList[i].added = date;
        }
        
        if (userList[i].lastmod != null ) {
            let date = new Date(userList[i].lastmod * 1000);
            userList[i].lastmod = date;
        }

        if (userList[i].voted != null ) {
            let date = new Date(userList[i].voted * 1000);
            userList[i].voted = date;
        }
    }

    res.ulist = userList;

    next();
}


module.exports = {
    _getUserList,
    getUserNovels,
    updateUserNovels
}