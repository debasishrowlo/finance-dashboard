import mongoose from "mongoose"

const schema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  token: {
    type: String,
    required: true,
  },
}, {
  collection: "refresh-tokens",
})

const model = mongoose.model("RefreshToken", schema)

export default model