var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ArticleCatSchema = new Schema({
  cat_name: { type: String, required: true, trim: true },
  parent_id: { type: String, default: 'root' },
  sort: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now, required: true },
  updated_at: { type: Date, default: Date.now, required: true },
  active: { type: Boolean, default: true, required: true }
});

mongoose.model('ArticleCat', ArticleCatSchema);