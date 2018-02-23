"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    username: String,
    password: String,
});
const UserModal = mongoose.model('User', UserSchema);
module.exports = UserModal;
//# sourceMappingURL=users.js.map