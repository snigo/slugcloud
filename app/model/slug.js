const { Schema, model } = require('mongoose');

const slugSchema = new Schema({
  slug: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  pid: {
    type: String,
    required: true,
  },
  timeCreated: {
    type: String,
    default: new Date().toISOString(),
  },
});

const Slug = model('Slug', slugSchema);

/**
 * CRUD:
 * Create
 * Read
 * Update
 * Delete
 */

exports.createSlug = async (data) => {
  const slug = new Slug(data);
  const entry = await slug.save();
  return entry;
};

exports.getUrl = async (slug) => {
  const entry = await Slug.findOne({ slug });
  if (!entry) return null;
  return entry.url;
};

exports.getByUser = async (pid) => {
  const entries = await Slug.find({ pid });
  return entries;
};
