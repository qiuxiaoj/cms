var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  title: { type: String, required: true, trim: true },
  content: { type: String },
  image_url: { type: String, trim: true },
  cat_id: { type: String, required: true, index: true},
  created_at: { type: Date, default: Date.now, required: true },
  updated_at: { type: Date, default: Date.now, required: true },
  active: { type: Boolean, default: true, required: true }
});

mongoose.model('Article', ArticleSchema);