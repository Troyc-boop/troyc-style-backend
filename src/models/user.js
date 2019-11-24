import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({

    name: String,
    gender: String,
    password: String,
    username: String

});

userSchema.methods.toDto = function () {
  return {name: this.name, gender: this.gender, username: this.username};
};

const User = mongoose.model('User', userSchema);

export default User;

