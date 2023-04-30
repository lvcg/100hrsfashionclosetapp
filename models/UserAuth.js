const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const UserAuthSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    trim: true,
  },
});

// Hash the password before saving it to the database
UserAuthSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password') || user.isNew) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(user.password, salt);
      user.password = hash;
      return next();
    } catch (error) {
      return next(error);
    }
  } else {
    return next();
  }
});

// Compare the password entered by the user with the hashed password in the database
UserAuthSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const UserAuth = mongoose.model('UserAuth', UserAuthSchema);

module.exports = UserAuth;
