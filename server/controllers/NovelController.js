// Model
const VNs = require("../models/VN");
const NovelException = require("../exceptions/NovelException");

// VNDB
const VNDB = require("vndb-api");

// Expects req.ulist
async function _updateNovels(req, res, next) {
    const vndb = new VNDB("clientname", {});
    
    let ulistNovelIDs = [];
    let ulistVNs = [];

    let pagination = 1;
    let searchingUser = true;

    for (let i = 0; i < res.ulist.length; i++) {
        ulistNovelIDs.push(res.ulist[i].vn);
    }

    while (searchingUser) {
        await vndb.query(`get vn basic,details,screens,titles,stats (id=[${ulistNovelIDs}]) {"page": ${pagination}, "results":25}`)
          .then((response) => {
            ulistVNs.push(...response.items);
    
            if (response.more === true) {
              pagination++;
            }
            else {
              searchingUser = false;
            }
          })
          .catch ((e) => {
            next(NovelException.internal(e.message));
            return;
          })
      }

    vndb.destroy();

    for (let i = 0; i < ulistVNs.length; i++) {

        VNs.find({"id": ulistVNs[i].vn}, function(err, novel) {
          if (novel.length === 0 || err) {
            console.log("Novel with corresponding ID not found. Adding to database...");
            let newNovel = new VNs(ulistVNs[i]).save();
          }
          else {
            console.log("Novel already exists in database. Skipping...");
          }
        });
    }

    next();
};

const getNovels = async (req, res) => {
    let novels;
    try {
        novels = await VNs.find({});
        res.status(200).json(novels);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

const getNovel = async (req, res) => {
  res.status(200).send(res.novel);
}

async function searchNovel(req, res, next) {
  let novel;

  try {
    novel = await VNs.find({id: `${req.params.id}`});
    if (novel.length <= 0) {
      next(NovelException.NovelNotFound());
    }
  }
  catch (e) {
    next(NovelException.internal(e.message));

  }
  
  res.novel = novel[0];
  next();
}

async function _addNovel(req, res, next) {
  let novel;
  const vndb = new VNDB("clientname", {});
  await vndb.query(`get vn basic,details,screens,titles,stats (id=[${req.params.id}`)
          .then((response) => {
            novel = response.items;
          })
          .catch ((e) => {
            next(NovelException.internal(e.message));
            return;
          })
  
  
}

module.exports = {
    getNovels,
    _updateNovels,
    searchNovel,
    getNovel,
}