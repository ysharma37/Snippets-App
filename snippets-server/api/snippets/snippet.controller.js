const Snippet = require("./snippet.model");

const getSnippets = async (req, res) => {
  const { query } = req;
  const language = query.language;

  let filter = {};

  if (language) {
    filter = { programming_language: { $regex: language, $options: "i" } };
  }

  try {
    const snippets = await Snippet.find(filter);
    res.json(snippets);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

const getSnippetsById = async (req, res) => {
  const { params, query } = req;
  const id = params.id;

  let snippet = null;
  try {
    if (query.bookmark === "true") {
      snippet = await Snippet.findOne({
        _id: id,
      }).populate("bookmarksforsnippets");
    } else {
      snippet = await Snippet.findOne({
        _id: id,
      });
    }

    if (snippet) {
      res.json(snippet);
    } else {
      res.status(404).json({ error: `Snippet not found` });
    }
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

const createSnippet = async (req, res) => {
  const { body } = req;

  try {
    const snippetDoc = new Snippet(body);
    console.log(body);
    const snippet = await snippetDoc.save();
    res.json(snippet);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

const deleteSnippet = async (req, res) => {
  const { params } = req;
  const id = params.id;

  try {
    const deleted = await Snippet.findOneAndDelete({
      _id: id,
    });
    if (deleted) {
      res.json({ message: "Success", snippet: deleted._id });
    } else {
      res.status(404).json({ error: `No snippet found by id: ${id} ` });
    }
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

module.exports = {
    getSnippets,
    getSnippetsById,
    createSnippet,
    deleteSnippet
};