const UserException = require("../exceptions/UserException");
const NovelException = require("../exceptions/NovelException");

async function validateInput(req, res, next) {
	if (isNaN(req.params.id)) {
		next(UserException.InvalidInput());
	}
	next();
}

async function validateNovelInput(req, res, next) {
	if (isNaN(req.params.id)) {
		next(NovelException.InvalidInput());
	}
	next();
}

module.exports = {
    validateInput,
	validateNovelInput
}