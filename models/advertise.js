var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AdvertiseSchema = new Schema({
  title: { type: String, required: true },
  desc: { type: String },
  link: { type: String, required: true, trim: true },
  image_url: { type: String, required: true },
  category: { type: String, default: 'home', required: true },
  created_at: { type: Date, default: Date.now, required: true },
  updated_at: { type: Date, default: Date.now, required: true },
  active: { type: Boolean, default: true, required: true }
});

mongoose.model('Advertise', AdvertiseSchema);