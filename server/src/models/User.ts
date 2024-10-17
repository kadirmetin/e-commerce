import mongoose from 'mongoose'

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
      required: true
    },
    role: {
      type: String,
      enum: ['USER', 'ADMIN'],
      default: 'USER'
    },
    favorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products'
      }
    ]
  },
  {
    timestamps: true
  }
)

const UserModal = mongoose.model('users', UserSchema)
export default UserModal
