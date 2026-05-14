import mongoose from 'mongoose';

const NewsletterSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Newsletter || mongoose.model('Newsletter', NewsletterSchema);
