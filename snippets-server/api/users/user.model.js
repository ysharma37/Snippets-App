const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: String,
    years_experience: String,
    specialties: [String],
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

UserSchema.pre("findOneAndUpdate", async function (next) {
  const { _id } = this.getQuery();

  const { username } = this.getUpdate();

  if (username) {
    const user = await User.findOne({ username });
    if (user && user._id.toString() !== _id) {
      const error = new Error(`Username ${user.username} is already exists.`);
      return next(error);
    }
  }
  next();
});

UserSchema.virtual("snippets", {
  ref: "Snippet",
  localField: "_id",
  foreignField: "user_id",
});

UserSchema.virtual("bookmarks", {
  ref: "Bookmark",
  localField: "_id",
  foreignField: "user_id",
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
