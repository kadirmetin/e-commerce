import mongoose from 'mongoose'

const BannerSchema = new mongoose.Schema(
  {
    title: {
      type: String
    },
    image: {
      type: String
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'categories'
    }
  },
  {
    timestamps: true
  }
)

const BannerModal = mongoose.model('banners', BannerSchema)

export default BannerModal
