import { Schema, model, Types } from "mongoose";

const ShortenedURLSchema = new Schema({
  url: {
    type: String,
    validate: {
      validator: function (URL) {
        return /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(
          URL
        );
      },
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
