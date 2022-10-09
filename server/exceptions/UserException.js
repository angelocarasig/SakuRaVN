class UserException {
    constructor(code, message) {
        this.code = code || 500;
        this.message = message;
    }

    static internal(message) {
        return new UserException(500, message);
    }

    static UserNotFound() {
        return new UserException(400, "User not found.");
    }

    static UserAlreadyExists() {
        return new UserException(400, "User already exists.");
    }

    static InvalidInput() {
        return new UserException(400, "Only numbers are valid input.");
    }
}

module.exports = UserException;