import mongoose from 'mongoose';

const formRateLimitSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
    },
    count: {
      type: Number,
      required: true,
      default: 0,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

formRateLimitSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const FormRateLimit =
  mongoose.models.FormRateLimit ||
  mongoose.model('FormRateLimit', formRateLimitSchema);

export default FormRateLimit;
