import mongoose from "mongoose";

const ElementSchema = new mongoose.Schema({
  text: { type: String, required: true },
  fontSize: { type: Number, required: true, default: 18 },
  isBold: { type: Boolean, default: false },
  isItalic: { type: Boolean, default: false },
  color: { type: String, default: "#000000" },
});

const ButtonSchema = new mongoose.Schema({
  text: { type: String, required: true },
  fontSize: { type: Number, required: true, default: 20 },
  isBold: { type: Boolean, default: false },
  isItalic: { type: Boolean, default: false },
  textColor: { type: String, default: "#ffffff" },
  backgroundColor: { type: String, default: "#f5c542" },
});

const WishlistSchema = new mongoose.Schema({
  projectName: { type: String, required: true },
  heading: { type: ElementSchema, required: true },
  subheading: { type: ElementSchema, required: true },
  button: { type: ButtonSchema, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to user
});

export default mongoose.models.Wishlist ||
  mongoose.model("Wishlist", WishlistSchema);
