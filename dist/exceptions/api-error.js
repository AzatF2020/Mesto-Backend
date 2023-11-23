export default class ApiError extends Error {
    constructor(message, status, errors = []) {
        super();
        this.message = message;
        this.status = status;
        this.errors = errors;
    }
    static BadRequest(message, errors = []) {
        return new ApiError(message, 400, errors);
    }
    static UnauthorizedError() {
        return new ApiError('user not authorized', 401, this.errors);
    }
    static Forbidden(errors = []) {
        return new ApiError('permission denied', 403, this.errors);
    }
    static NotFound(message, errors = []) {
        return new ApiError(message, 404, errors);
    }
}
