import mongoose from "mongoose";

const EmailSchema = new mongoose.Schema(
  {
    wishlistId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Wishlist",
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

EmailSchema.index({ wishlistId: 1, email: 1 }, { unique: true });

export default mongoose.models.Email || mongoose.model("Email", EmailSchema);
