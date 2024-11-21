const mongoose = require("mongoose");

const SnippetSchema = new mongoose.Schema(
  {
    title: String,
    code_snippet: String,
    programming_language: String,
    created: {
      type: Date,
      default: Date.now,
    },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

SnippetSchema.post("findOneAndDelete", async function (doc) {
  const Bookmark = mongoose.model("Bookmark");

  console.log(doc);

  try {
    await Bookmark.deleteMany({ snippet_id: doc._id });
  } catch (error) {
    console.log(error);
  }
});

SnippetSchema.virtual("bookmarksforsnippets", {
  ref: "Bookmark",
  localField: "_id",
  foreignField: "snippet_id",
});

const Snippet = mongoose.model("Snippet", SnippetSchema);

module.exports = Snippet;
