const UserException = require("./UserException");
const NovelException = require("./NovelException");

function UserExceptionHandler(err, req, res, next) {
    console.error(err);

    if (err instanceof UserException || err instanceof NovelException) {
        res.status(err.code).json(err.message);
        return;
    }

    res.status(500).json("Something went wrong.");
}

module.exports = UserExceptionHandler;