const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const User = require("./user.model");

const config = require("../../config.json");

const getUserById = async (req, res) => {
  const { params, query } = req;

  const id = params.id;

  try {
    const virtuals = [];

    if (query.snippets === "true" && query.bookmarks === "true") {
      virtuals.push("snippets");
      virtuals.push("bookmarks");
    } else {
      if (query.snippets === "true") {
        virtuals.push("snippets");
      }
      if (query.bookmarks === "true") {
        virtuals.push("bookmarks");
      }
    }

    const user = await User.findOne({ _id: id })
      .select("-password")
      .populate(virtuals);

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: `No User found with id: ${id}` });
    }
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

const registerUser = async (req, res) => {
  const { body } = req;
  const { email, password } = body;

  if (!password || !email) {
    return res.status(400).json({ error: "Email and Password are required." });
  }

  try {
    const salt = await bcrypt.genSalt(10);

    const hashed = await bcrypt.hash(password, salt);

    const userDoc = new User({ ...body, password: hashed });
    const saved = await userDoc.save();

    const user = saved.toObject();

    delete user.password;

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const authentcated = await bcrypt.compare(password, user.password);

    if (authentcated) {
      const token = jwt.sign(
        { id: user._id, email: email._email },
        config.jwtsecret,
        { expiresIn: "24h" }
      );

      const authorized = user.toObject();

      delete authorized.password;

      res.header("Authorization", `Bearer ${token}`).json(authorized);
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

const updateUser = async (req, res) => {
  const { params, body } = req;
  const id = params.id;

  try {

    delete body.password;
    
    const updated = await User.findByIdAndUpdate({ _id: id }, body).select(
      "-password"
    );

    if (updated) {
      res.json(updated);
    } else {
      res.status(404).json({ error: `No User found by id: ${id}` });
    }
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserById,
  updateUser,
};
