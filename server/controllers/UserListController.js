// Model
const User = require("../models/User");

// VNDB
const VNDB = require("vndb-api");
const { response } = require("express");

async function _getUserList(req, res, next) {
    let user;

    try {
        user = await User.find({ id: req.params.id });
        if (user == null) {
          return res.status(404).json({ message: "User does not exist." });
        }
      } 
      catch (e) {
        return res.status(500).json({ message: e.message });
    };

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

    console.log(userList);
    
    res.user = user[0];

    // Date Conversion
    for (let i = 0; i < userList.length; i++) {
        console.log("Loop: " + i);
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

const updateUserNovels = async (req, res) => {
    
    if (res.user.id === null) {
        res.status(400).json({ message: "User does not exist." });
    }

    const userToUpdate = new User({
        id: res.user.id,
        username: res.user.username,
        vnlist: res.ulist,
    });

    try {
        await User.deleteMany({ id: res.user.id });
        const newUser = userToUpdate.save();
        res.status(201).json(newUser);
    }
    catch (e) {
        res.status(400).json({ message: e.message });
    }
};

module.exports = {
    _getUserList,
    getUserList,
    updateUserNovels
}