const router = require("express").Router();
const Admin = require("../models/admin.model");
// const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.get("/", (req, res) => {
  Admin.find()
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.post("/", async (req, res) => {
  try {
    // const salt = await bcrypt.genSalt();
    // const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const admins = new Admin({
      username: req.body.username,
      password: req.body.password,
    });

    admins.save();
    res.status(201).send("ADDED");
  } catch {
    res.status(500).send("Error");
  }
});

// router.post('/',(req, res) => {
//   const admins = new Admin({
//      username: req.body.username,
//      password: req.body.password
//   });

//   admins.save()
//   .then(() => res.json('Added!'))
//   .catch(err => res.status(400).json('Error: ' + err));
// });

router.delete("/delete/:id", (req, res) => {
  Admin.findByIdAndDelete(req.params.id)
    .then(() => res.json("Admin deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

// router.get('/posts', authenticateToken, (req, res) => {
//   res.json(posts.filter(post => post.username === req.user.name))
// })

// function authenticateToken(req, res, next) {
//   const authHeader = req.headers['authorization']
//   const token = authHeader && authHeader.split(' ')[1]
//   if (token == null) return res.sendStatus(401)

//   jwt.verify(token, 'secretkey', (err, user) => {
//     console.log(err)
//     if (err) return res.sendStatus(403)
//     req.user = user
//     next()
//   })
// }

router.post("/dash", async (req, res) => {
  // Mock user
  // const salt = await bcrypt.genSalt();
  // const hashedPassword = await bcrypt.hash(req.body.password, salt);
  const username = req.body.username;
  const password = req.body.password;
  const user = await Admin.findOne({ username, password }).lean();
  if (!user) {
    return res.json({ status: "error", error: "Invalid Username or password" });
  }

  const token = jwt.sign(
    { id: user._id, username: user.username },
    "secretkey",
    { expiresIn: "1h" }
  );
  return res.json({ status: "okay", data: token });
});

router.post("/posts", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", (error, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: "Post created...",
        authData,
      });
    }
  });
});

function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers["authorization"];
  // Check if bearer is undefined
  if (typeof bearerHeader !== "undefined") {
    // Split at the space
    const bearer = bearerHeader.split(" ");
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;
    // Next middleware
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }
}

module.exports = router;
