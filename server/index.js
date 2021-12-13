const express = require("express");
const db = require("./services/db.js");

const app = express();
const PORT =  process.env.PORT || 3001;

const usersRouter = require("./routes/users.js");
const userRouter = require("./routes/user.js");

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, access_token"
  );
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, OPTIONS, DELETE");
  next();
});

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

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