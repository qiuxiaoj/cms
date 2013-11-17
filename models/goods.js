var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var GoodsSchema = new Schema({
  name: { type: String, required: true, trim: true },
  desc: { type: String, trim: true },
  content: { type: String },
  image_url: { type: String, trim: true, required: true },
  brand_id: { type: String, required: true, index: true},
  type: { type: Number},
  tag: { type: String, index: true},
  created_at: { type: Date, default: Date.now, required: true },
  updated_at: { type: Date, default: Date.now, required: true },
  active: { type: Boolean, default: true, required: true }
});

mongoose.model('Goods', GoodsSchema);