var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BrandSchema = new Schema({
  name: { type: String, required: true },
  desc: { type: String },
  image_url: { type: String, required: true },
  created_at: { type: Date, default: Date.now, required: true },
  updated_at: { type: Date, default: Date.now, required: true },
  active: { type: Boolean, default: true, required: true }
});

mongoose.model('Brand', BrandSchema);