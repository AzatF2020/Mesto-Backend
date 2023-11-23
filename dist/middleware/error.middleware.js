import ApiError from '../exceptions/api-error';
export default function (err, req, res, next) {
    if (err instanceof ApiError) {
        return res.status(err === null || err === void 0 ? void 0 : err.status).json({ message: err === null || err === void 0 ? void 0 : err.message,
            errors: err === null || err === void 0 ? void 0 : err.errors });
    }
    return res.status(500).json({ message: err.message });
}
