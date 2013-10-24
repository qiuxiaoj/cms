var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MenuSchema = new Schema({
  name: { type: String, index: true, required: true, trim: true },
  link: { type: String, required: true, trim: true },
  position: { type: String, default: 'top', required: true },
  created_at: { type: Date, default: Date.now, required: true },
  updated_at: { type: Date, default: Date.now, required: true },
  active: { type: Boolean, default: true, required: true }
});

mongoose.model('Menu', MenuSchema);