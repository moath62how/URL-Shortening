import { Schema, model, Types } from "mongoose";
import validator from "validator";
const ShortenedURLSchema = new Schema({
  url: {
    type: String,
    validate: {
      validator: (e) => validator.isURL(e),
      message: (props) => `${props.value} is not a valid URL!`,
    },
    required: [true, "URL is required"],
  },
  shortCode: {
    type: String,
    unique: true,
  },
  user: {
    type: Types.ObjectId,
    ref: "User",
    required: [true, "Each URL must belong to a user"],
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: [true, "The creation date is required"],
  },
  accessCount: {
    type: Number,
    default: 0,
  },
});

const ShortenedURL = model("ShortenedURL", ShortenedURLSchema);

export default ShortenedURL;
