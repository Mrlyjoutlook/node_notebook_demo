import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: String,
  password: String,
});

const UserModal = mongoose.model('User', UserSchema);

module.exports = UserModal;
