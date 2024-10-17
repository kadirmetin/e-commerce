import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    desc: {
      type: String,
      required: true
    },
    images: {
      type: Array,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'categories',
      required: true
    },
    favoriteCount: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
)

const ProductModal = mongoose.model('products', ProductSchema)

export default ProductModal
