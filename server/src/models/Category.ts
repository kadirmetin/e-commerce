import mongoose from 'mongoose'

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true
  },
  desc: {
    type: String
  }
})

const CategoryModal = mongoose.model('categories', CategorySchema)
export default CategoryModal
