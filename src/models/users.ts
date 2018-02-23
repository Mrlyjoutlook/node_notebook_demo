import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: String,
  password: String,
});

UserSchema
  .virtual('userInfo')
  .get(function() {
    return {
      username: this.username,
    };
  });

const User = mongoose.model('User', UserSchema);

module.exports = User;
