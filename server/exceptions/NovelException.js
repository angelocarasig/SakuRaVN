class NovelException {
    constructor(code, message) {
        this.code = code || 500;
        this.message = message;
    }

    static internal(message) {
        return new NovelException(500, message);
    }

    static NovelNotFound() {
        return new NovelException(400, "Novel not found.");
    }

    static NovelAlreadyExists() {
        return new NovelException(400, "Novel already exists.");
    }

    static InvalidInput() {
        return new NovelException(400, "Only numbers are valid input.");
    }
}

module.exports = NovelException;