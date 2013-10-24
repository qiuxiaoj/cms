var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: { type: String, index: true, required: true, trim: true },
  loginname: { type: String, unique: true, required: true, trim: true },
  pass: { type: String, required: true },
  email: { type: String, unique: true, trim: true },
  is_admin: { type: Boolean, default: false, required: true },
  created_at: { type: Date, default: Date.now, required: true },
  updated_at: { type: Date, default: Date.now, required: true },
  active: { type: Boolean, default: true, required: true }
});

mongoose.model('User', UserSchema);