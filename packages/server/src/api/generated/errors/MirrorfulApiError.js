"use strict";
/**
 * This file was auto-generated by Fern from our API Definition.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MirrorfulApiError = void 0;
class MirrorfulApiError extends Error {
    errorName;
    constructor(errorName) {
        super();
        this.errorName = errorName;
        Object.setPrototypeOf(this, MirrorfulApiError.prototype);
    }
}
exports.MirrorfulApiError = MirrorfulApiError;
