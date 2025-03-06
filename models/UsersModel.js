import { model, Schema } from "mongoose";
import { compare, hash } from "bcryptjs";
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "you must enter an username"],
    },
    email: {
      type: String,
      required: [true, "You must enter an email"],
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    password: {
      type: String,
      required: [true, "You must enter a password"],
      select: false,
      minlength: [8, "Password must be at least 8 characters long"],
      maxlength: [20, "Password cannot exceed 20 characters"],
      validate: {
        validator: function (value) {
          return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/.test(
            value
          );
        },
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      },
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      required: true,
      default: "user",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  else this.password = await hash(this.password, 12);
});

userSchema.methods.correctPassword = async function (candidatePassword) {
  return await compare(candidatePassword, this.password);
};

const User = model("User", userSchema);
export default User;
