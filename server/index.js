const express = require("express");
const db = require("./services/db.js");

const app = express();
const PORT =  process.env.PORT || 3001;

const usersRouter = require("./routes/users.js");
const userRouter = require("./routes/user.js");

app.use("/api", usersRouter);
app.use("/api", userRouter);

app.get("/", (req, res) => {
  res.json({
    "message": "mainRoute"
  });
});

app.use((req, res) => {
  res.status(404).json({
    "ok": false,
    "error": "404 Not Found"
  });
});

app.listen(PORT, () => {
  console.log(`Server has been started on PORT ${PORT}`);
});