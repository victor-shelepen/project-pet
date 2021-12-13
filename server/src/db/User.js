import mongoose from 'mongoose'
import { generateHash } from '../lib'

const { String } = mongoose.Schema.Types

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
      select: false
    },
    role: {
      type: String,
      required: true,
      default: 'user',
      enum: ['user', 'admin', 'root']
    }
  },
  {
    timestamps: true
  }
)

UserSchema.pre('save', async function () {
  const hash = generateHash(this.password)
  if (this.isModified('password') || this.isNew) {
    this.password = hash
  }
})

UserSchema.methods.comparePassword = function(candidatePassword) {
  const hash = generateHash(candidatePassword)

  return this.password == hash
}

export default mongoose.models.User || mongoose.model('User', UserSchema);
