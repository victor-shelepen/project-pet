import mongoose from 'mongoose'
const { Number, ObjectId } = mongoose.Schema.Types

const MeasurementSchema = new mongoose.Schema(
  {
    user: {
      type: ObjectId,
      ref: 'User',
      required: true
    },
    height: {
      type: Number,
      required: true
    },
    weight: {
      type: Number,
      required: true,
    }
  },
  {
    timestamps: true
  }
)

export default mongoose.models.Measurement || mongoose.model('Measurement', MeasurementSchema);
