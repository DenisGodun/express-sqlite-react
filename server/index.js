const express = require("express");
const usersRouter = require("./routes/users.js");
const db = require("./services/db.js");

const app = express();
const PORT =  process.env.PORT || 3001;

app.use("/api", usersRouter);

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